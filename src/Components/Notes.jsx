import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useOutletContext } from "react-router-dom";

const Notes = () => {
	const context = useContext(NoteContext);
	const { notes, fetchAllNotes, editNote: contextEditNote } = context;
	const { showAlert } = useOutletContext();
	const [currentNoteId, setCurrentNoteId] = useState("");
	const [noteData, setNoteData] = useState("");
	const [isNoteSaved, setIsNoteSaved] = useState(false);

	useEffect(() => {
		fetchAllNotes();
		if (isNoteSaved) {
			// Run your logic here after saveNote is performed
			console.log("Note was updated successfully!");

			// Reset the state to avoid infinite loop
			setIsNoteSaved(false);
		}
	}, [isNoteSaved]);

	const modalRef = useRef(null);
	const editNote = (note) => {
		const { _id: id } = note;
		console.log("Modal	Id", id);
		modalRef.current.click();
		setCurrentNoteId(id);
	};
	const handelEditNote = (updatedNote) => {
		setNoteData(updatedNote);
	};
	const saveNote = async () => {
		const { title, description, tag } = noteData;
		try {
			await contextEditNote(currentNoteId, title, description, tag);
			setIsNoteSaved(true);
			showAlert("Note updated Successfully", "primary");
		} catch (error) {
			showAlert(error.message, "primary");
		}
	};

	return (
		<div className="row my-2 d-f">
			{notes?.length === 0 ? <h2>No Notes to Display</h2> : <h2>Your Notes</h2>}

			<button
				type="button"
				className="invisible"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={modalRef}
			>
				Launch demo modal
			</button>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Update Note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<AddNote
								displayButton={false}
								onEditNote={handelEditNote}
								resetModalValue={isNoteSaved}
								currentNoteId={currentNoteId}
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={saveNote}
								disabled={
									noteData?.title?.length <= 3 ||
									noteData?.description?.length <= 5
								}
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>

			{notes?.map((item, i) => {
				return <NoteItem key={i} note={item} editNote={editNote} />;
			})}
		</div>
	);
};

export default Notes;
