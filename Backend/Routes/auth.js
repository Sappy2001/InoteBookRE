const express = require("express");
const router = express.Router();

//hit endpoint /api/auth
router.get("/", (req, res) => {
	const obj = {
		name: "sappy",
	};
	res.json(obj);
});

module.exports = router;
