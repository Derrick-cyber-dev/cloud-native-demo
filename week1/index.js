// Import Express ("like "use Illuminate\Http\Request" in Laravel")
// index.js
// Day 3 - Full CRUD Products API

const express = require('express');
const app = express();

app.use(express.json());

// ============================================
// OUR "DATABASE" - just an array for now
// On Day 7+ this becomes a real database
// ============================================
let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 10 },
  { id: 2, name: 'Phone', price: 499.99, category: 'Electronics', stock: 25 },
  { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture', stock: 8 },
];

// Helper: generate a new ID (simulates auto-increment)
let nextId = 4;

// ============================================
// ROUTES
// ============================================

// GET /api/products — return ALL products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// GET /api/products/:id — return ONE product
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  // If product not found, return 404
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

// POST /api/products — CREATE a new product
app.post('/api/products', (req, res) => {
  const { name, price, category, stock } = req.body;

  // Validate — all fields required
  if (!name || !price || !category || !stock) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, price, category and stock',
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    category,
    stock,
  };

  products.push(newProduct);

  // 201 = Created (not 200)
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

// PUT /api/products/:id — UPDATE a product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  // If not found, return 404
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  // Merge existing product with new data from body
  const updatedProduct = {
    ...products[productIndex], // keep existing fields
    ...req.body, // overwrite with new fields
    id: id, // never allow id to change
  };

  products[productIndex] = updatedProduct;

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

// DELETE /api/products/:id — DELETE a product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  // If not found, return 404
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
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Routes ready:');
  console.log(`  GET    http://localhost:${PORT}/api/products`);
  console.log(`  GET    http://localhost:${PORT}/api/products/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/products`);
  console.log(`  PUT    http://localhost:${PORT}/api/products/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/products/:id`);
});

/*
// My first route — GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue dans mon univers Cloud Native!',
    day: 2,
    status: 'running',
  });
});

// My second route — GET /api/hello

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Salut depuis Express',
    timestamp: new Date().toISOString(),
  });
});

// I start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  app.get('/api/greet/:name', (req, res) => {
    const name = req.params.name;
    res.json({
      message: `Salut ${name}! Bienvenue a Cloud Native.`,
      name: name,
    });
  });
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});
*/
