import React from "react";

const Alert = (props) => {
	return (
		<div
			className={`alert alert-${props.alert?.type} d-flex align-items-center`}
			role="alert"
		>
			{props.alert?.message}
		</div>
	);
};

export default Alert;
