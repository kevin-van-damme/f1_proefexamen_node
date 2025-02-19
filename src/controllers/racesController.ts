import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Race } from "../models/raceModel";
const { ValidationError } = MongooseError;

export const getRaces = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();
    res.status(200).json(races);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
