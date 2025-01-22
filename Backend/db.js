const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
	try {
		await mongoose.connect(mongoURI);
		console.log("MongoDb connected");
	} catch (error) {
		console.log("Error", error);
	}
};

module.exports = connectToMongo;
