import NoteContext from "./NoteContext";

import React, { useState } from "react";

const NoteState = (props) => {
	const initialNotes = [
		{
			_id: "6793460e4dba83f4076e5a92",
			user: "6791e86efb86abf5d4d258b1",
			title: "dd updated",
			description: "valids",
			tag: "personal",
			date: "1737704974866",
			__v: 0,
		},
		{
			_id: "6799b90a8341d37f9a834931",
			user: "6791e86efb86abf5d4d258b1",
			title: "New Note",
			description: "HoiChoi",
			tag: "Not Personal",
			date: "1738127626295",
			__v: 0,
		},
	];
	const [notes, setNotes] = useState(initialNotes);
	return (
		<NoteContext.Provider value={{ notes, setNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
