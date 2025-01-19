const express = require('express');
const router = express.Router();
const connection = require('../services/db');  

const products = [...Array(100).keys()].map((_, index) => ({
  product_id: index + 1,
  product_name: `Product ${index + 1}`,
  category_name: `Category ${((index % 5) + 1)}`,
}));

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 10; 
  const startIndex = (page - 1) * pageSize;

  const query = `
    SELECT products.product_id, products.product_name, products.category_id, categories.category_name as categoryName
    FROM products
    JOIN categories ON products.category_id = categories.category_id
    LIMIT ? OFFSET ?
  `;

  try {
    const [results] = await connection.query(query, [pageSize, startIndex]);

    const [[{ count }]] = await connection.query('SELECT COUNT(*) AS count FROM products');
    const totalPages = Math.ceil(count / pageSize);
    console.log(totalPages)

    res.json({
      products: results,
      totalPages: totalPages,
      currentPage: page,

    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


router.get('/count', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM products');
    const count = rows[0]?.count || 0;

    res.setHeader('Cache-Control', 'no-store');
    res.json({ count });
  } catch (error) {
    console.error('Error fetching product count:', error.message);
    res.status(500).json({ error: 'Failed to fetch product count' });
  }
});



 


router.post('/', async (req, res) => {  
  const { product_name, category_id } = req.body;

  if (!product_name || !category_id) {
    return res.status(400).json({ error: 'Product name and category are required' });
  }

  const query = 'INSERT INTO products (product_name, category_id) VALUES (?, ?)';
  try {
    await connection.query(query, [product_name, category_id]);  
    res.status(201).json({ message: 'Product added successfully' }); 
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

router.put('/:id', async (req, res) => {  
  const { id } = req.params;
  const { product_name, category_id } = req.body;

  if (!product_name || !category_id) {
    return res.status(400).json({ error: 'Product name and category are required' });
  }

  const query = 'UPDATE products SET product_name = ?, category_id = ? WHERE product_id = ?';
  try {
    await connection.query(query, [product_name, category_id, id]); 
    res.sendStatus(200); 
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {  
  const { id } = req.params;

  const query = 'DELETE FROM products WHERE product_id = ?';
  try {
    await connection.query(query, [id]);  
    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
