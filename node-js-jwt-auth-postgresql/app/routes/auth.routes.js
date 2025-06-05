

module.exports = function(app) {
  
  const controller = require("../controllers/auth.controller.js");
  app.post("/api/auth/signup", controller.signup);
  app.post("/api/auth/signin", controller.signin);
};
