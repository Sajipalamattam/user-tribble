const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check username first (if you have username field)
  User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Then check email
    User.findOne({
      where: { email: req.body.email }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};

module.exports = {
  checkDuplicateUsernameOrEmail
};
