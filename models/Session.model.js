const { Schema, model } = require("mongoose");

const userSchema = new Schema(

{
	X_id: {
		type: String
		require: true
		 },
	weight: String,
	reps: String,
	sets: String,
	user_id: {
		type: String
		require: true
	},
	timestamp: true
}
);

const Session = model("Session", userSchema);

module.exports = Session;
