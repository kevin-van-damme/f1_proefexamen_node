import express from "express";
import { getRaces } from "../controllers/racesController";
import { getDrivers } from "../controllers/driversController";
import { getTeams } from "../controllers/teamsController";
import { getCircuits } from "../controllers/circuitsController";

const router = express.Router();

router
  .get("/races", getRaces)
  .get("/drivers", getDrivers)
  .get("/teams", getTeams)
  .get("/circuits", getCircuits);

export default router;
