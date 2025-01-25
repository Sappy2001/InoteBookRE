const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../MiddleWare/fetchUser");

const JWT_Secret = "Sappy AllStar";
//router hit endpoint /api/auth

//Route:1 Create user with email&password endpoint
router.post(
	"/",
	[
		body("name", "enter a valid name").isLength({ min: 3 }),
		body("email").isEmail(),
		body.apply("password").isLength({ min: 5 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}
		// //creates a new instance of User
		// const user = User(req.body);
		// //saves the data in db
		// user.save();
		const { name, email, password } = req.body;
		//generating 10 char salt
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(password, salt);
		//check existing userEmail
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ error: "Sorry email already exist" });
			}
			user = await User.create({
				name,
				email,
				password: secPass,
			});
			const data = user.id;
			const authToken = jwt.sign(data, JWT_Secret);
			res.json(authToken);
		} catch (error) {
			res.status(500).send({ message: "Something went wrong" });
		}
	}
);
// Route:2  /login endpoint
router.post(
	"/login",
	[
		body("email", "enter valid email").isEmail(),
		body("password", "password cannot be blank").isLength({ min: 1 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			res.status(400).json({ errors: err.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				res.status(400).json("Enter proper credentials");
			}
			const comparePassword = await bcrypt.compare(password, user.password);
			if (!comparePassword) {
				res.status(400).json("Enter proper credentials");
			}
			const data = user.id;
			authToken = jwt.sign(data, JWT_Secret);
			res.json({ authToken });
		} catch (error) {
			res.status(500).send("Internal Server Error");
		}
	}
);

// Route:3 get user Login details /getuser(login required)
router.post("/getUser", fetchUser, async (req, res) => {
	try {
		const userId = req.user;
		const user = await User.findById(userId).select("-password");
		res.send({ user });
	} catch (err) {
		res.status(401).send("user not found");
	}
});

module.exports = { router };
