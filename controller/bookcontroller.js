const mongodb = require('../mongodb/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

async function retrieveBooks(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const booksCollection = db.collection('Books');
    const books = await booksCollection.find({}).toArray();

    res.json(books);

    console.log("Function working");
    console.log(JSON.stringify(books));
  } catch (error) {
    console.error('Error retrieving Books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET a single Book by ID
async function retrieveOneBook(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const booksCollection = db.collection('Books');
    const bookId = req.params.id;

    // Convert the BookId to ObjectId
    const objectIdBookId = new ObjectId(bookId);

    // Find a single document by ID
    const book = await booksCollection.findOne({ _id: objectIdBookId });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error retrieving Book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new Book
async function createBook(req, res) {
  try {
    // Extract required fields from the request body
    const book = {
      name: req.body.name,
      category: req.body.category,
      year: req.body.year
    };

    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const booksCollection = db.collection('Books');

    // Insert the new Book into the database
    const result = await booksCollection.insertOne(book);

    // Extract the generated Book ID from the result
    const bookId = result.insertedId;

    // Return the new Book ID in the response
    res.status(201).json({ bookId });
  } catch (error) {
    console.error('Error creating Book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a Book
async function updateBook(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const booksCollection = db.collection('Books');

    // Extract Book ID from the request parameters
    const bookId = req.params.id;

    // Extract updated fields from the request body
    const { name, category, year } = req.body;

    // Check if the Book ID is valid
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid Book ID' });
    }

    // Construct update query
    const updateFields = {};
    if (name) updateFields.name = name;
    if (category) updateFields.category = category;
    if (year) updateFields.year = year;

    // Update the Book in the database
    await booksCollection.updateOne({ _id: new ObjectId(bookId) }, { $set: updateFields });

    // Return success status
    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating Book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a Book
async function deleteBook(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const booksCollection = db.collection('Books');

    // Extract Book ID from the request parameters
    const bookId = req.params.id;

    // Check if the Book ID is valid
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid Book ID' });
    }

    // Delete the Book from the database
    await booksCollection.deleteOne({ _id: new ObjectId(bookId) });

    // Return success status
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting Book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { retrieveBooks, retrieveOneBook, createBook, updateBook, deleteBook };
