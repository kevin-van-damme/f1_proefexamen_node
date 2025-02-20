import { Request, Response } from "express";
import { Race } from "../models/raceModel";
import { Driver } from "../models/driverModel";
import timeFormat from "../utilities/timeFormat";
import { Error as MongooseError } from "mongoose";

export const getRaces = async (req: Request, res: Response) => {
  const formattedTime = timeFormat(123456, true, 1);
  console.log(formattedTime);
  try {
    const races = await Race.find();
    // Stap 2: Verzamel alle unieke driver_ids uit alle races
    const driverIds = races.flatMap((race) =>
      race.race_results.map((result) => result.driver_id)
    );
    // Stap 3: Haal alle coureurs op op basis van de verzamelde driver_ids
    const drivers = await Driver.find({ driver_id: { $in: driverIds } });
    // Stap 4: Maak een lookup map voor snelle toegang tot coureurdetails
    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, {
        driver_id: driver.driver_id,
        name: driver.driver_id,
        nationality: driver.nationality,
        flagUrl: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode}.svg`, // Voeg de vlag-URL toe
      });
    });
    // Stap 5: Voeg coureurdetails toe aan race-resultaten
    const racesWithDriverDetails = races.map((race) => {
      const raceResultsWithDriverDetails = race.race_results.map((result) => {
        const driverDetails = driverMap.get(result.driver_id);
        const formatTime = timeFormat(
          result.time,
          req.query.format === "true",
          result.position
        );
        return {
          ...result.toObject(),
          driver_id: driverDetails || null,
          time: formatTime,
        };
      });
      return {
        ...race.toObject(), // Race-document omzetten naar een gewoon object
        race_results: raceResultsWithDriverDetails,
      };
    });
    res.status(200).json(racesWithDriverDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
