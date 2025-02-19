import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  principal: {
    type: String,
    required: true,
    trim: true,
  },
  founded_year: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  drivers: [
    {
      driver_id: {
        type: String,
        required: true,
        trim: true,
      },
      position: {
        type: Number,
        required: true,
      },
    },
  ],
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Team = mongoose.model("Team", teamSchema);
