const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
  res.send("Hello");
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

module.exports = router;