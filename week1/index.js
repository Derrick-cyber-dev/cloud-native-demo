// index.js
// Main entry point - connects everything together

const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Import middleware
const isAuthenticated = require('./middleware/auth');

// Public routes - no token needed
app.use('/auth', authRoutes);

// Public GET routes
app.get('/api/products', require('./routes/products'));
app.get('/api/products/:id', require('./routes/products'));

app.use('/api/products', isAuthenticated, productRoutes);

// ============================================
// START SERVER
// ============================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nPublic routes:');
  console.log(`  POST   http://localhost:${PORT}/auth/register`);
  console.log(`  POST   http://localhost:${PORT}/auth/login`);
  console.log(`  GET    http://localhost:${PORT}/api/products`);
  console.log('\nProtected routes (token required):');
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
