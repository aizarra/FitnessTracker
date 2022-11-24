const { Schema, model } = require('mongoose');

const wosessionSchema = new Schema({
  name: String,
  weight: Number,
  reps: Number,
  sets: Number,
});

const Wosession = model('Wosession', wosessionSchema);

module.exports = Wosession;
