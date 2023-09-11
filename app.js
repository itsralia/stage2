const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./conn.js');
const Person = require('./userModel'); 

app.use(bodyParser.json());

// Create (POST)
// Create (POST)
let nextUserId = 1; // Initialize the next user_id

// Create (POST)
app.post('/api', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Calculate the new user_id
    const user_id = nextUserId;

    // Increment nextUserId for the next user
    nextUserId++;

    // Create the new user with the calculated user_id and name
    const person = new Person({ user_id, name }); // Ensure 'name' is not null or empty
    const savedPerson = await person.save();

    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

  

// Read (GET)
// Read (GET) by user_id
app.get('/api/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const person = await Person.findOne({ user_id }); // Use findOne with user_id
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Error fetching person' });
  }
});

// Update (PUT)
// Update (PUT)
app.put('/api/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id; // Get user_id from the URL parameter
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Find the user by user_id and update the 'name' field
    const updatedUser = await Person.findOneAndUpdate(
      { user_id },
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete (DELETE)
app.delete('/api/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id; // Corrected from id to user_id
    const person = await Person.findOneAndRemove({ user_id });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Error deleting person' });
  }
});

connect()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server connected and listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Cannot connect to the server:', error);
    console.error('Invalid database connection...!');
  });
