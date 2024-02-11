

const mongodb = require('../mongodb/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Books').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createBooks = async (req, res) => {
  const Books = {
    name: req.body.name,
    category: req.body.category,
    year: req.body.year,

  };
  const response = await mongodb.getDb().db().collection('Books').insertOne(Books);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Books.');
  }
};

const updateBooks = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const Books = {
    name: req.body.name,
    category: req.body.category,
    year: req.body.year,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Books')
    .replaceOne({ _id: userId }, Books);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the Books.');
  }
};

const deleteBooks = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Books').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Books.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBooks,
  updateBooks,
  deleteBooks
};