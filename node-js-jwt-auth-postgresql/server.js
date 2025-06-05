const express = require("express");
const cors = require("cors");

const app = express();

// Set this to match your frontend's port (e.g., 3000 for React)
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// ✅ Parse requests of content-type - application/json
app.use(express.json());

// ✅ Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Import Sequelize models
const db = require("./app/models");

// ✅ Register routes AFTER middleware
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/role.routes')(app);

// Direct test route for debugging
app.get('/test', (req, res) => res.send('Test route working'));

// Function to print all registered routes (method + path)
function printRoutes(app) {
  if (!app._router) {
    console.log('No routes registered yet.');
    return;
  }
  console.log('Registered routes:');
  app._router.stack.forEach(function(middleware){
    if (middleware.route) {
      // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).map(m => m.toUpperCase()).join(', ');
      console.log(`${methods} ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      // Routes added as router middleware
      middleware.handle.stack.forEach(function(handler){
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).map(m => m.toUpperCase()).join(', ');
          console.log(`${methods} ${handler.route.path}`);
        }
      });
    }
  });
}

// Sync models and then start server
const PORT = process.env.PORT || 8080;
db.sequelize.sync()

  .then(() => {
    console.log("Synced db.");
    printRoutes(app);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
