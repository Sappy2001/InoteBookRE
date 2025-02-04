const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();
const { router: authRoutes } = require("./Routes/auth");
//created custom cors file
// const crossOriginReq = require("./MiddleWare/crossOriginRequest.js");
const cors = require("cors");
const app = express();
const port = 5000;
app.get("/", (req, res) => {
	res.send("hello world");
});
//applying express.json to all routes to acess req.body
app.use(express.json());
//use cors for this domain:Port (frontend req)
app.use(cors({ origin: "http://localhost:5173" }));
//.use makes all request go through  middleware for "/api/auth" path only
//the middleware is written in routes folder
app.use("/api/auth", authRoutes);
//.use makes all request go through  middleware for "/api/notes" path only
//instead of storing import directly importing here using "require"
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
	console.log("App listening to inoteBook Backend:", port);
});
