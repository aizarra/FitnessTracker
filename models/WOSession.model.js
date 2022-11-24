const { Schema, model } = require('mongoose');

const wosessionSchema = new Schema({
  name: String,
  weight: String,
  reps: String,
  sets: String,
});

const Wosession = model('Wosession', wosessionSchema);

module.exports = Wosession;
