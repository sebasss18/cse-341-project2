const { body, validationResult } = require("express-validator");

const booksValidation = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("author").trim().notEmpty().withMessage("Author is required"),

    body("genre").trim().notEmpty().withMessage("Genre is required"),

    body("publishedYear")
      .isInt({ min: 0 })
      .withMessage("Published year must be a valid number"),

    body("pages")
      .isInt({ min: 1 })
      .withMessage("Pages must be a positive number"),

    body("language")
      .trim()
      .notEmpty()
      .withMessage("Language is required"),

    body("available")
      .isBoolean()
      .withMessage("Available must be true or false"),
  ];
};

const authorsValidation = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required"),

    body("nationality")
      .trim()
      .notEmpty()
      .withMessage("Nationality is required"),

    body("birthYear")
      .isInt({ min: 0 })
      .withMessage("Birth year must be a valid number"),

    body("genres")
      .notEmpty()
      .withMessage("Genres field is required"),

    body("active")
      .isBoolean()
      .withMessage("Active must be true or false"),
  ];
};

const validate = (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  booksValidation,
  authorsValidation,
  validate,
};