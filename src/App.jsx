import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Components/Alert";
const App = () => {
	const [alert, setAlert] = useState({ message: "", type: "" });
	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	};

	return (
		<>
			<NoteState>
				<NavBar />
				<Alert alert={alert} />
				<Outlet context={{ showAlert }} />
			</NoteState>
		</>
	);
};

export default App;
