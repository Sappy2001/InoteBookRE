import NoteContext from "./NoteContext";

import React, { useState } from "react";

const NoteState = (props) => {
	const s1 = {
		name: "Sappy",
		gender: "M",
	};
	const [state, setState] = useState(s1);
	const update = () => {
		setTimeout(() => {
			setState({
				name: "HArry",
				gender: "F",
			});
		}, 2000);
	};
	return (
		<NoteContext.Provider value={{ state, update }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
