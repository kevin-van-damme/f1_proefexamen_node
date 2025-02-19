import mongoose, { Mongoose } from "mongoose";
import { url } from "node:inspector";

const driverSchema = new mongoose.Schema(
  {
    driver_id: {
      type: String,
      required: true,
      trim: true,
    },
    permanentNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: url,
      required: true,
      trim: true,
    },
    givenName: {
      type: String,
      required: true,
      trim: true,
    },
    familyName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: url,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Driver = mongoose.model("Driver", driverSchema);
