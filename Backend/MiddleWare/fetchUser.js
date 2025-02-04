var jwt = require("jsonwebtoken");
const JWT_Secret = "Sappy AllStar";

const fetchUser = (req, res, next) => {
	//get user from jwt and add id to req.body
	const token = req.header("auth-token");
	if (!token) {
		return res.status(400).send({ message: "user not found" });
	}
	try {
		const data = jwt.verify(token, JWT_Secret);
		console.log(data);
		req.user = data;
		next();
	} catch (error) {
		res.status(401).send("Error in credentials,fetchUser");
	}
};

module.exports = fetchUser;
