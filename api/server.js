const express = require('express');
const app = express();
const port = 3000;

const healthRoutes = require("./src/routes/health.route.js");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api/health", healthRoutes);

