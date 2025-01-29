import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import NoteState from "./Context/Notes/NoteState";
const App = () => {
	return (
		<>
			<NoteState>
				<NavBar />
				<Outlet />
			</NoteState>
		</>
	);
};

export default App;
