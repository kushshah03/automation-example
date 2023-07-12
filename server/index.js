const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set up body parser middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Render the form on the initial page load
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { firstName, lastName } = req.body;
  res.render('routed', { firstName, lastName });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

