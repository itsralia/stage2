const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./conn.js');
const Person = require('./userModel'); 

app.use(bodyParser.json());


let nextUserId = 1; // Initialize the next user_id


// endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await Person.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Error fetching all users' });
  }
});

// Create (POST)
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
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

  

app.get('/api/users/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const person = await Person.findOne({ user_id });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Error fetching person' });
  }
});


app.put('/api/users/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id; 
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

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

app.delete('/api/users/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id; 
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
