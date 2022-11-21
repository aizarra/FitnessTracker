const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema

({
  bodypart: String, 
  equipment: String,
  gifUrl: String,
  id: Number,
  name: String,
  target: String
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;