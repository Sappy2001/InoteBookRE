import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
	const context = useContext(NoteContext);
	const { notes, setNotes } = context;
	return (
		<div className="row my-2 d-f">
			<h2>Your Notes</h2>

			{notes.map((item) => {
				return <NoteItem note={item} />;
			})}
		</div>
	);
};

export default Notes;
