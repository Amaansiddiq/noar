const express = require('express');
const router = express.Router();
const connection = require('../services/db');  

const categories = [
    { category_id: 1, category_name: 'Category 1' },
    { category_id: 2, category_name: 'Category 2' },
    { category_id: 3, category_name: 'Category 3' },
    { category_id: 4, category_name: 'Category 4' },
    { category_id: 5, category_name: 'Category 5' },
  ];

// CRUD operations for categories
router.get('/', async (req, res) => {  n
    try {
        const [results] = await connection.query('SELECT * FROM categories');  
        res.json(results);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        await connection.query('INSERT INTO categories (name) VALUES (?)', [name]);  
        res.sendStatus(201);
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ error: 'Failed to add category' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);  
        res.sendStatus(200);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM categories WHERE id = ?', [id]); 
        res.sendStatus(200);
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;
