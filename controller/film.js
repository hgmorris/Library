const mongodb = require('../mongodb/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

async function retrieveFilms(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const filmsCollection = db.collection('film');
    const films = await filmsCollection.find({}).toArray();

    res.json(films);

    console.log("Function working");
    console.log(JSON.stringify(film));
  } catch (error) {
    console.error('Error retrieving film:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET a single film by ID
async function retrieveOneFilm(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const filmsCollection = db.collection('film');
    const filmId = req.params.id;

    // Convert the filmId to ObjectId
    const objectIdFilmId = new ObjectId(filmId);

    // Find a single document by ID
    const film = await filmsCollection.findOne({ _id: objectIdFilmId });

    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.json(film);
  } catch (error) {
    console.error('Error retrieving Film by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new film
async function createFilm(req, res) {
  try {
      // Extract required fields from the request body
      const { title, author, publishYear, description, coverImage, thumbnail, price, pageCount, genre, isbn } = req.body;

      // Validate the required fields
      const validationErrors = [];
      if (!title) validationErrors.push('Title is required');
      if (!author) validationErrors.push('Author is required');
      if (!publishYear) validationErrors.push('Publish year is required');
      if (!isbn) validationErrors.push('ISBN is required');
      // Add more validation rules as needed...

      if (validationErrors.length > 0) {
          return res.status(400).json({ errors: validationErrors });
      }

      const db = getDb();
      if (!db) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      const filmCollection = db.collection('film');

      // Construct the film object
      const film = {
            title,
            year,
            rating,
      };

      // Insert the new film into the database
      const result = await filmCollection.insertOne(film);

      // Extract the generated film ID from the result
      const filmId = result.insertedId;

      // Return the new film ID in the response
      res.status(201).json({ filmId });
  } catch (error) {
      console.error('Error creating film:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Update a film
async function updateFilm(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const filmsCollection = db.collection('film');

    // Extract film ID from the request parameters
    const filmId = req.params.id;

    // Extract updated fields from the request body
    const { name, category, year } = req.body;

    // Check if the film ID is valid
    if (!ObjectId.isValid(filmId)) {
      return res.status(400).json({ error: 'Invalid film ID' });
    }

    // Construct update query
    const updateFields = {};
    if (name) updateFields.name = name;
    if (category) updateFields.category = category;
    if (year) updateFields.year = year;

    // Update the film in the database
    await filmsCollection.updateOne({ _id: new ObjectId(filmId) }, { $set: updateFields });

    // Return success status
    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating film:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a film
async function deletefilm(req, res) {
  try {
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const filmsCollection = db.collection('film');

    // Extract film ID from the request parameters
    const filmId = req.params.id;

    // Check if the film ID is valid
    if (!ObjectId.isValid(filmId)) {
      return res.status(400).json({ error: 'Invalid film ID' });
    }

    // Delete the film from the database
    await filmsCollection.deleteOne({ _id: new ObjectId(filmId) });

    // Return success status
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting film:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { retrieveFilms, retrieveOneFilm, createFilm, updateFilm, deletefilm };
