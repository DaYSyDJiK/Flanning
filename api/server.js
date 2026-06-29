const express = require('express');
const app = express();
const port = 3000;

const healthRoutes = require("./src/routes/health.route.js");
const employeeRoute = require("./src/routes/employee.routes.js");
const sequelize = require("./src/config/database.js");

// middlewares
app.use(express.json());

// routes
app.use("/api/health", healthRoutes);
app.use("/api/employee", employeeRoute);

// test database
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("✅ Connexion à la base de données réussie")

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err)
  };

};

startServer();



