import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Circuit } from "../models/circuitModel";
const { ValidationError } = MongooseError;

export const getCircuits = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string | undefined;
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};
    const circuits = await Circuit.find(filter);
    res.status(200).json(circuits);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
