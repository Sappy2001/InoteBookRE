const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();

const app = express();
const port = 3000;
app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(port, () => {
	console.log("App listening to port:", port);
});
