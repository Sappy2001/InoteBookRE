const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: String,
		default: Date.now,
	},
});
const User = mongoose.model("user", UserSchema);
//used for creating index to retrieve data fast
//creating custom index on email as its unique
User.createIndexes();
module.exports = User;
