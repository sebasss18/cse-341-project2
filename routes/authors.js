const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");
const { authorsValidation, validate } = require("../middleware/validate");

router.get("/", authorsController.getAll);

router.get("/:id", authorsController.getSingle);

router.post("/", authorsValidation(), validate, authorsController.createAuthor);

router.put(
  "/:id",
  authorsValidation(),
  validate,
  authorsController.updateAuthor,
);

router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
