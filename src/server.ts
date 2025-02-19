// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import testRoutes from "./routes/exampleRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import { getTeams } from "./controllers/teamsController";
import { Driver } from "./models/driverModel";
import { Team } from "./models/teamModel";
import { getDrivers } from "./controllers/driversController";
import { Circuit } from "./models/circuitModel";
import { Race } from "./models/raceModel";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUtes
app.use("/api", helloMiddleware, testRoutes);
app.all("*", notFound);

// Database connection
try {
  if (!process.env.MONGO_URI_LIVE) {
    console.log("no uri");
  }
  await mongoose.connect(process.env.MONGO_URI_LIVE!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
