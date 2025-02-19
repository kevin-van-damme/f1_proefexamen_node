import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Circuit } from "../models/circuitModel";
const { ValidationError } = MongooseError;

export const getCircuits = async (req: Request, res: Response) => {
  try {
    const circuits = await Circuit.find();
    res.status(200).json(circuits);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
