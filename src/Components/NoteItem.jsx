import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPenToSquare,
	faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
const NoteItem = ({ note }) => {
	return (
		<div className="col-md-3">
			<div className="card m-3">
				<div className="container d-flex justify-content-between w-100 my-2">
					<button type="button" class="btn ">
						<FontAwesomeIcon style={{ color: "red" }} icon={faRectangleXmark} />
					</button>
					<button type="button" class="btn  ">
						<FontAwesomeIcon style={{ color: "blue" }} icon={faPenToSquare} />
					</button>
				</div>
				<div className="card-body container">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
};

export default NoteItem;
