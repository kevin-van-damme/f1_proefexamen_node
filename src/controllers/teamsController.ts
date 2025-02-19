import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Team } from "../models/teamModel";
const { ValidationError } = MongooseError;

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
