const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set up body parser middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Render the form on the initial page load
app.get('/', (req, res) => {
  res.render('index', { error: null, firstName: '', lastName: '' });
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { firstName, lastName } = req.body;
  // Check for empty fields
  if (!firstName || !lastName) {
    res.render('index', { error: 'All fields are required', firstName, lastName });
  } else {
    res.render('routed', { firstName, lastName });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

