const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


class SiteController {
  //[GET] /
  index(req, res, next) {
    res.render("home", {
      name: req.user.username,
    });
  }

  login(req, res, next) {
    res.render("login");
  }

  logout(req, res, next) {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  }

  validateLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  register(req, res, next) {
    res.render("register");
  }

  validateRegister(req, res, next) {
    const { email, password, username, fullAdress, city, country, telephone } =
      req.body;
    let errors = [];

    //check required fields
    if (
      !email ||
      !password ||
      !username ||
      !fullAdress ||
      !city ||
      !country ||
      !telephone
    ) {
      errors.push({ msg: "Please fill in all fields" });
    }

    //check password length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        email,
        password,
        username,
        fullAdress,
        city,
        country,
        telephone,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors,
            email,
            password,
            username,
            fullAdress,
            city,
            country,
            telephone,
          });
        } else {
          const newUser = new User({
            email,
            password,
            username,
            fullAdress,
            city,
            country,
            telephone,
          });

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  }
}

module.exports = new SiteController();
