const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['Hello']
  res.send("Library API");
});

router.get("/status", (req, res) => {
  if (req.session.user) {
    res.send(`Logged in as ${req.session.user.displayName}`);
  } else {
    res.send("Logged Out");
  }
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("l/ogout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
