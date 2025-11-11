require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");

// Import routes
const walletRoutes = require("./src/routes/walletRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");

const app = express();
const APP_PORT = process.env.APP_PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transaction", transactionRoutes);

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
    await sequelize.authenticate(); // Test database connection
    console.log('Database connected...');

    await sequelize.sync(); // Create tables if they don't exist
    console.log('All models were synchronized successfully...');

    app.listen(APP_PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${APP_PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server: ', error);
    process.exit(1);
  }
}

start();
