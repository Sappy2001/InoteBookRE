const express = require("express");
const router = express.Router();

//hit endpoint /api/notes
router.get("/", (req, res) => {
	const obj = {
		name: "noted",
	};
	res.json(obj);
});

module.exports = router;
