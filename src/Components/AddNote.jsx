import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import { useOutletContext } from "react-router-dom";

const AddNote = ({
	displayButton,
	onEditNote,
	resetModalValue,
	currentNoteId,
}) => {
	const { showAlert } = useOutletContext();
	const context = useContext(NoteContext);
	const { addNote, notes } = context;
	const [note, setNote] = useState({ title: "", description: "", tag: "" });
	const handleClick = (e) => {
		e.preventDefault();
		console.log(note);
		addNote(note);
		resetValues();
		showAlert("Note has succesfully added", "success");
	};
	const resetValues = () => {
		console.log("resetting");
		setNote({ title: "", description: "", tag: "" });
	};
	useEffect(() => {
		if (currentNoteId) {
			const noteValue = notes.find((item) => item._id === currentNoteId);
			const { title, description, tag } = noteValue;
			console.log(title, description, tag);
			setNote({ title, description, tag });
		}
		if (resetModalValue) resetValues();
	}, [resetModalValue, currentNoteId]);

	const Onchange = (e) => {
		// from name attr of the input we get target.name
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		if (onEditNote) {
			onEditNote(note);
		}
	}, [note]);

	return (
		<div className=" my-3">
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						value={note.title}
						aria-describedby="titleHelp"
						onChange={Onchange}
						minLength={3}
						required
					/>
					{(displayButton === undefined || displayButton) && (
						<div id="titleHelp" className="form-text">
							We'll never share your notes with anyone else.
						</div>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control"
						id="description"
						name="description"
						value={note.description}
						onChange={Onchange}
						minLength={5}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label" htmlFor="tag">
						Tag
					</label>
					<input
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						value={note.tag}
						onChange={Onchange}
					/>
				</div>
				{(displayButton === undefined || displayButton) && (
					<button
						type="submit"
						className="btn btn-primary"
						onClick={handleClick}
						disabled={
							note?.title?.length <= 3 || note?.description?.length <= 5
						}
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

export default AddNote;
