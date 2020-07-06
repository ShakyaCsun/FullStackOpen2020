import React from "react";

const Form = (props) => {
	const handleSubmitForm = props.handleSubmitForm
	const handleName = props.handleName
	const handleNumber = props.handleNumber
	const name = props.name
	const number = props.number

	return (
		<form onSubmit={handleSubmitForm}>
			<div>
				Name: <input onChange={handleName} value={name} />
			</div>
			<div>
				Number:{" "}
				<input type="tel" onChange={handleNumber} value={number} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default Form;
