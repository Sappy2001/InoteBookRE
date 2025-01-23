const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//hit endpoint /api/auth
router.get(
	"/",
	[
		body("name", "enter a valid name").isLength({ min: 3 }),
		body("email").isEmail(),
		body.apply("password").isLength({ min: 5 }),
	],
	(req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}
		// //creates a new instance of User
		// const user = User(req.body);
		// //saves the data in db
		// user.save();
		const { name, email, password } = req.body;
		User.create({
			name,
			email,
			password,
		})
			.then((user) => res.json(user))
			.catch((err) =>
				res.json({ error: "Enter unique email", message: err.errmsg })
			);
	}
);

module.exports = router;
