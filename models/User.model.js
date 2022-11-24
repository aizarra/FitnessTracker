const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    chosenExercise: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        require: true,
      },
    ],
    wosession: [
      {
        name: String,
        weight: Number,
        reps: Number,
        sets: Number,
        // type: Schema.Types.ObjectId,
        // ref: 'wosession',
        // require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
