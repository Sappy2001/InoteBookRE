import React from "react";

import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = (props) => {
	return (
		<div className="container my-3">
			<h1>Your NoteBook</h1>

			<AddNote />
			<Notes />
		</div>
	);
};

export default Home;
