import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Components/Alert";
const App = () => {
	return (
		<>
			<NoteState>
				<NavBar />
				<Alert message={"Hello this is alerts"} />
				<Outlet />
			</NoteState>
		</>
	);
};

export default App;
