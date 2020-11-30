var express = require("express");
var router = express.Router();

var Student = require("../controllers/student");

// Home Page Routes -------------------------------------------------------------------------
router.get("/", function (req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render("students", { list: data }))
    .catch(error => res.render("error", {error: error}));
});

router.get("/students", function (req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render("students", { list: data }))
    .
    catch(error => res.render("error", {error: error}));
});

router.post("/students", function (req, res) {
  Student.insert({numero: req.body.number, nome: req.body.name, git: req.body.git})
    .then(res.redirect('/students'))
    .catch(error => res.render("error", {error: error}))
});


// Register Page Routes ---------------------------------------------------------------------
router.get("/students/register", function (req, res) {
  res.render("register");
});

// Student Page Routes ----------------------------------------------------------------------
router.get("/students/:id", function (req, res) {
  Student.lookUp(req.params.id)
    .then(function(s) {
      res.render("student", { student: s })
    })
    .catch(error => res.render("error", {error: error}))
});

router.get("/students/edit/:id", function (req, res) {
  Student.lookUp(req.params.id)
    .then(function(s) {
      res.render("edit", { student: s })
    })
    .catch(error => res.render("error", {error: error}))
});

router.put("/students/:id", function (req, res) {
  Student.update(req.body)
    .then(function(s) {
      res.render("student", { student: s })
    })
    .catch(error => res.render("error", {error: error}))
});

router.delete("/students/:id", function (req, res) {
  Student.delete(req.params.id)
    .catch(error => res.render("error", {error: error}))
});

module.exports = router;
