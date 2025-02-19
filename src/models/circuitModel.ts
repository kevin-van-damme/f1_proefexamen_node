import mongoose from "mongoose";

const circuitSchema = new mongoose.Schema({
  circuit_id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trime: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  length_km: {
    type: Number,
    required: true,
  },
  turns: {
    type: Number,
    required: true,
  },
});

export const Circuit = mongoose.model("Circuit", circuitSchema);
