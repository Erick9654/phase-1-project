const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// GET route to fetch all customers
app.get('/customers', (req, res) => {
    // Example: Read customer data from a JSON file and send it as response
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const customers = JSON.parse(data).customers;
      res.json(customers);
    });
  });
  
  // POST route to add a new customer
  app.post('/customers', (req, res) => {
    const newCustomer = req.body;
  
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const db = JSON.parse(data);
      db.customers.push(newCustomer);
  
      fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) {
          console.error('Error writing to db.json:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        res.status(201).json(newCustomer);
      });
    });
  });
  
  // Define other routes as needed...
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  