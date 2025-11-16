require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const APP_PORT = process.env.APP_PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Start server
async function start() {
  try {
    app.listen(APP_PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${APP_PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
}

start();
