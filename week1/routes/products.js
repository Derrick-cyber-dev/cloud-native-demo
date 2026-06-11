// routes/products.js
// Full CRUD - now protected by JWT middleware

const express = require('express');
const router = express.Router();

// Our products data
let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 10 },
  { id: 2, name: 'Phone', price: 499.99, category: 'Electronics', stock: 25 },
  { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture', stock: 8 },
];
let nextId = 4;

// GET /api/products - public (anyone can view products)
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// GET /api/products/:id - public
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  res.json({ success: true, data: product });
});

// POST /api/products - protected (login required)
router.post('/', (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name || !price || !category || !stock) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, price, category and stock',
    });
  }

  const newProduct = { id: nextId++, name, price, category, stock };
  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct,
    created_by: req.user.name, 
  });
});

// PUT /api/products/:id - protected
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
    id: id,
  };

  products[productIndex] = updatedProduct;

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
    updated_by: req.user.name,
  });
});

// DELETE /api/products/:id - protected
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);

  res.json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct,
    deleted_by: req.user.name,
  });
});

module.exports = router;
