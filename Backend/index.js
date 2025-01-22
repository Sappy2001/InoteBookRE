const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();

const app = express();
const port = 3000;
app.get("/", (req, res) => {
	res.send("hello world");
});

//.use creates a middleware for api/auth path
//the middleware is written in routes folder
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
	console.log("App listening to port:", port);
});
