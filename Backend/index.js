const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();
const { router: authRoutes } = require("./Routes/auth");

const app = express();
const port = 5000;
app.get("/", (req, res) => {
	res.send("hello world");
});
//applying express.json to all routes to acess req.body
app.use(express.json());
//.use creates a middleware for api/auth path
//the middleware is written in routes folder
app.use("/api/auth", authRoutes);
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
	console.log("App listening to port:", port);
});
