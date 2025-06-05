module.exports = function(app) {
  const controller = require("../controllers/role.controller.js");
  app.post("/api/roles/add", controller.create);
  app.post("/api/roles", controller.findAll);     
  app.post("/api/roles/delete", controller.delete);
  app.post("/api/role/search", controller.search);
  app.post("/api/roles/select", controller.select);
  app.post("/api/role/update", controller.update);

};
