const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("authors")
      .find();

    const authors = await result.toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Authors']

  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("authors")
      .findOne({ _id: authorId });

    if (!result) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    birthYear: req.body.birthYear,
    genres: req.body.genres,
    active: req.body.active,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .insertOne(author);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || "Error creating author.");
  }
};

const updateAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const authorId = new ObjectId(req.params.id);

  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    birthYear: req.body.birthYear,
    genres: req.body.genres,
    active: req.body.active,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .replaceOne({ _id: authorId }, author);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error updating author.");
  }
};

const deleteAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const authorId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .deleteOne({ _id: authorId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error deleting author.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
