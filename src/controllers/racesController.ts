import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Race } from "../models/raceModel";
import { Driver } from "../models/driverModel";
const { ValidationError } = MongooseError;

export const getRaces = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();
    const drivers = await Driver.find();
    if (!races || races.length === 0) {
      return res.status(404).json({ message: "No races found" });
    }
    const racesWithDetails = drivers.map((driver) => {
      const countryFlag = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${race.countryCode}.svg`;
      console.log(racesWithDetails, countryFlag);
      races.race_results = races.race_results.map((result) => {
        const driver = drivers.find(
          (driver) => driver.driver_id === result.driver_id
        );
        return {
          ...result,
          driver: driver ? driver : null,
        };
      });
      return {
        ...races,
        countryFlag,
      };
    });

    res.status(200).json(racesWithDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
