const express = require('express');
const router = express.Router();
const connection = require('../services/db');  

/* categories
    { category_id: 1, category_name: 'Category 1' },
*/
router.get('/', async (req, res) => {  
      try {
          const [results] = await connection.query('SELECT * FROM categories');  
          res.json(results);
      } catch (err) {
          console.error('Error fetching categories:', err);
          res.status(500).json({ error: 'Failed to fetch categories' });
      }
  });
  
router.post('/', async (req, res) => {
    const { category_name } = req.body;
    try {
      const [result] = await connection.query('INSERT INTO categories (category_name) VALUES (?)', [category_name]);
      const newCategoryId = result.insertId;  
      res.status(201).json({ category_id: newCategoryId, category_name }); 
    } catch (err) {
      console.error('Error adding category:', err);
      res.status(500).json({ error: 'Failed to add category' });
    }
  });

  router.put('/:id', async (req, res) => {
      const { id } = req.params;
      const { category_name } = req.body;  
      try {
          await connection.query('UPDATE categories SET category_name = ? WHERE category_id = ?', [category_name, id]);  
          res.status(200).json({ message: 'Category updated successfully' }); 
      } catch (err) {
          console.error('Error updating category:', err);
          res.status(500).json({ error: 'Failed to update category' });
      }
  });
  
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await connection.query('DELETE FROM categories WHERE category_id = ?', [id]);
      res.status(200).json({ message: 'Category deleted successfully' }); 
    } catch (err) {
      console.error('Error deleting category:', err);
      res.status(500).json({ error: 'Failed to delete category' });  
    }
  });
  
module.exports = router;
  