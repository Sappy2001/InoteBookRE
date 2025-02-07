import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	let navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (json.authToken?.length > 5) {
			localStorage.setItem("token", json.authToken);
			navigate("/");
		} else console.log(json);
	};
	const onChangeFunction = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<form onSubmit={handleSubmit}>
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

export default Login;
