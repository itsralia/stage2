const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./conn.js');
const Person = require('./userModel');

app.use(bodyParser.json());

let nextUserId = 1; // Initialize the next user_id

// Endpoint to retrieve all users
app.get('/api', async (req, res) => {
  try {
    const users = await Person.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Error fetching all users' });
  }
});

// Create (POST)
app.post('/api', async (req, res) => {
  try {
    const { name } = req.body;
    if (typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string' });
    }

    const user_id = nextUserId;

    nextUserId++;

    const person = new Person({ user_id, name });
    const savedPerson = await person.save();

    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Retrieve user by ID or name (GET)
app.get('/api/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const filter = isNaN(identifier) ? { name: identifier } : { user_id: identifier };

    const person = await Person.findOne(filter);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Error fetching person' });
  }
});

// Update user by ID or name (PUT)
app.put('/api/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const { name } = req.body;
    
    if (typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string' });
    }

    const filter = isNaN(identifier) ? { name: identifier } : { user_id: identifier };

    const updatedUser = await Person.findOneAndUpdate(filter, { name }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user by ID or name (DELETE)
app.delete('/api/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;

    const filter = isNaN(identifier) ? { name: identifier } : { user_id: identifier };

    const person = await Person.findOneAndRemove(filter);

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
