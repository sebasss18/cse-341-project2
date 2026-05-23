const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const { booksValidation, validate } = require("../middleware/validate");

router.get("/", booksController.getAll);

router.get("/:id", booksController.getSingle);

router.post("/", booksValidation(), validate, booksController.createBook);

router.put("/:id", booksValidation(), validate, booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;
