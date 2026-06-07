// Import Express ("like "use Illuminate\Http\Request" in Laravel")
const express = require('express');

const app = express();

app.use(express.json());

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
