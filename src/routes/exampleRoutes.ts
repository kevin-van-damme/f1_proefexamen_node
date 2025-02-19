import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
} from "../controllers/exampleController";
import { getRaces } from "../controllers/racesController";
import { getDrivers } from "../controllers/driversController";
import { getTeams } from "../controllers/teamsController";
import { getCircuits } from "../controllers/circuitsController";

const router = express.Router();

router
  .get("/races", getRaces)
  .get("/drivers", getDrivers)
  .get("/teams", getTeams)
  .get("/circuits", getCircuits)
  .get("/todos", getTodos)
  .post("/todos", addTodo)
  .patch("/todos/:id", updateTodo);

export default router;
