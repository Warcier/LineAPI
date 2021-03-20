const express = require("express");
const router = express.Router();
const LineModel = require("../models/lineModel");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);


router.post("/dashboard", (req, res) => {
  const { id, line } = req.body;
  let errors = [];

  if (!id || !line) {
    errors.push({ msg: "Please input all the field" });
  }

  if (errors.length > 0) {
    res.render("dashboard/lines", {
      errors,
      id,
      line,
    });
  } else {
    LineModel.findOne({ id: id }).then((emailExists) => {
      if (emailExists) {
        errors.push({ msg: "ID already exists" });
        res.render("dashboard", {
          errors,
          id,
          line,
        });
      } else {
        const newLine = new LineModel({
          id,
          line,
        });

        newLine.save().then((line) => {
          req.flash("success_msg", "Submited Line");
          res.redirect("/dashboard");
        });
      }
    });
  }
});

module.exports = router;
