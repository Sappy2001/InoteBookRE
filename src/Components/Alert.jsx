import React from "react";

const Alert = (props) => {
	return (
		<div className="alert alert-primary d-flex align-items-center" role="alert">
			{props.message}
		</div>
	);
};

export default Alert;
