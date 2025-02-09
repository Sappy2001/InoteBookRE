import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	let navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		userName: "",
		email: "",
		password: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log({ credentials });
		const response = await fetch("http://localhost:5000/api/auth/", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				name: credentials.userName,
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (json?.length > 5) {
			localStorage.setItem("token", json);
			navigate("/");
		} else console.log("Invalid Credentials");
	};
	const onChangeFunction = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="userName" className="form-label">
					Name
				</label>
				<input
					type="text"
					className="form-control"
					id="userName"
					value={credentials.userName}
					name="userName"
					onChange={onChangeFunction}
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Email address
				</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					value={credentials.email}
					name="email"
					onChange={onChangeFunction}
					required
				/>
				<div id="emailHelp" className="form-text">
					We'll never share your email with anyone else.
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword1"
					value={credentials.password}
					name="password"
					onChange={onChangeFunction}
					required
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Signup;
