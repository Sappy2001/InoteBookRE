const express = require("express");
const fetchUser = require("../MiddleWare/fetchUser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//hit endpoint /api/notes
//Route:1 get all user notes (login required)
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user });
		const origin = req.headers.origin;
		console.log(origin);
		res.send({ notes });
	} catch (error) {
		res.status(401).send("enter proper credentials");
	}
});

//Route:2 create note for user (login required)
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

//Route:3 to update excisting note (login required)
router.put(
	//:id is params for specific noteId
	"/updateNote/:id",
	fetchUser,
	[
		body("title").optional().isLength({ min: 3 }),
		body("description").optional().isLength({ min: 5 }),
	],
	async (req, res) => {
		const { title, description, tag } = req.body;
		const newNote = {};
		if (title) newNote.title = title;
		if (description) newNote.description = description;
		if (tag) newNote.tag = tag;
		const noteId = req.params.id;
		let note = await Notes.findById(noteId);
		if (!note) {
			return res.status(404).send("Note not found");
		}
		// find user and check its his note or not
		if (note.user.toString() !== req.user) {
			return res.status(401).send("Not Allowed");
		}
		note = await Notes.findByIdAndUpdate(
			noteId,
			{ $set: newNote },
			{ new: true }
		);
		res.send({ note });
	}
);

// Route:4 Delete an existing note (login required)
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
	try {
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Note not found");
		}
		if (note.user.toString() !== req.user) {
			return res.status(401).send("Not Allowed");
		}
		note = await Notes.findByIdAndDelete(req.params.id);
		res.send({ Successs: "Note Has Been Deleted", note });
	} catch (error) {
		res.status(500).send({ error });
	}
});
module.exports = router;
