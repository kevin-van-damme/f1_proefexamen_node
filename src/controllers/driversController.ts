import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Driver } from "../models/driverModel";
import timeFormat from "../utilities/timeFormat";
const { ValidationError } = MongooseError;

export const getDrivers = async (req: Request, res: Response) => {
  const formattedTime = timeFormat(123456, true, 1);
  console.log(formattedTime);
  try {
    const searchQuery = req.query.search as string;
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};
    const drivers = await Driver.find(filter);
    res.status(200).json(drivers);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
