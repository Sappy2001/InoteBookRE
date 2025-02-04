const crossOriginReq = (req, res, next) => {
	const allowedOrigins = ["http://localhost:5173/"];
	const origin = req.headers.orgin;
	// console.log(origin);
	if (allowedOrigins.includes(origin)) {
		res.setHeaders("Access-Control-Allow-Orgin", origin);
		res.setHeaders("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, auth-token"
		);
	}
	if (req.methods === "OPTIONS") res.send(200).end();
	else next();
};

module.exports = crossOriginReq;
