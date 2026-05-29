const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");
const { authorsValidation, validate } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", authorsController.getAll);

router.get("/:id", authorsController.getSingle);

router.post(
  "/",
  isAuthenticated,
  authorsValidation(),
  validate,
  authorsController.createAuthor,
);

router.put(
  "/:id",
  isAuthenticated,
  authorsValidation(),
  validate,
  authorsController.updateAuthor,
);

router.delete("/:id", isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
