import NoteContext from "./NoteContext";

import React, { useState } from "react";

const NoteState = (props) => {
	const host = "http://localhost:5000";

	const [notes, setNotes] = useState();

	const fetchAllNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiJ9.Njc5MWU4NmVmYjg2YWJmNWQ0ZDI1OGIx.YTV1jG5AXpIPZLNM0NaoVLFxR8rCpNJLfQnclsiizlk",
			},
		});
		const json = await response.json();
		console.log(json.notes);
		setNotes(json.notes);
	};
	const addNote = async (note) => {
		const { title, description, tag } = note;
		console.log("adding new note");

		//For Server Side
		const response = await fetch(`${host}/api/notes/addNote`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiJ9.Njc5MWU4NmVmYjg2YWJmNWQ0ZDI1OGIx.YTV1jG5AXpIPZLNM0NaoVLFxR8rCpNJLfQnclsiizlk",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		console.log(json.savedNote._id);

		// For Client Side

		const newNote = {
			_id: json.savedNote._id,
			user: "6791e86efb86abf5d4d258b1",
			title,
			description,
			tag,
			date: json.savedNote.date,
		};
		setNotes(notes.concat(newNote));
	};

	const deleteNote = async (id) => {
		console.log("deleteing note id", id);

		//For Server Side
		const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiJ9.Njc5MWU4NmVmYjg2YWJmNWQ0ZDI1OGIx.YTV1jG5AXpIPZLNM0NaoVLFxR8rCpNJLfQnclsiizlk",
			},
		});
		const json = await response.json();
		console.log(json);
		//For Client Side
		const filterNotes = notes.filter((item) => {
			return item._id !== id;
		});
		setNotes(filterNotes);
	};

	const editNote = async (id, title, description, tag) => {
		//For Server Side
		const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiJ9.Njc5MWU4NmVmYjg2YWJmNWQ0ZDI1OGIx.YTV1jG5AXpIPZLNM0NaoVLFxR8rCpNJLfQnclsiizlk",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		//deepCopy of the notes
		const newNotes = JSON.parse(JSON.stringify(notes));
		// For Client Side
		for (let i = 0; i < notes.length; i++) {
			if (notes[i]._id === id) {
				newNotes[i].title = title;
				newNotes[i].description = description;
				newNotes[i].tag = tag;
				break;
			}
		}
		const json = await response.json();
		console.log(json);
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider
			value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
