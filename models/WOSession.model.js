const { Schema, model } = require('mongoose');

const wosessionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    name: String,
    weight: Number,
    reps: Number,
    sets: Number,
  },
  {
    timestamps: true,
  }
);
const Wosession = model('Wosession', wosessionSchema);

module.exports = Wosession;
