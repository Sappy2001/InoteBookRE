const express = require("express");
const fetchUser = require("../MiddleWare/fetchUser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//hit endpoint /api/notes
//Route:1 get all user notes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user });
		res.send({ notes });
	} catch (error) {
		res.status(401).send("enter proper credentials");
	}
});

//Route:2 create note for user
router.post(
	"/addNote",
	fetchUser,
	[
		body("title").isLength({ min: 3 }),
		body("description").isLength({ min: 5 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).send(err.array());
		}
		const { title, description, tag } = req.body;
		try {
			const note = new Notes({
				title,
				description,
				tag,
				user: req.user,
			});
			const savedNote = await note.save();
			res.send({ savedNote });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Internal server error ");
		}
	}
);

module.exports = router;
