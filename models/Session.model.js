const { Schema, model } = require("mongoose");
const User = require("./User.model");

const userSchema = new Schema(

{
	X_id: {
		type: ObjectId,
		ref: Exercise,
		require: true
		 },
	weight: String,
	reps: String,
	sets: String,
	user_id: {
		type: ObjectId,
		ref: User,
		require: true
	},
	timestamp: true
}
);

const Session = model("Session", userSchema);

module.exports = Session;
