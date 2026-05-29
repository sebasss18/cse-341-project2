const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['Hello']
  res.send("Library API");
});

router.get("/status", (req, res) => {
  if (req.user) {
    res.send(`Logged in as ${req.user.displayName}`);
  } else {
    res.send("Logged Out");
  }
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

router.get("/login", passport.authenticate("github"));

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;