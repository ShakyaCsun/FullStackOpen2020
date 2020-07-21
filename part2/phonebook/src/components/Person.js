import React from "react";

const Person = ({ name, number, handleDelete }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{number}</td>
			<td>
				<button onClick={handleDelete}>Delete</button>
			</td>
		</tr>
	);
};

export default Person;
