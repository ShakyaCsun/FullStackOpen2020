import React from "react";
import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Number</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{persons.map((person) => (
					<Person
						key={person.id}
						name={person.name}
						number={person.number}
						handleDelete={() => handleDelete(person.id)}
					/>
				))}
			</tbody>
		</table>
	);
};

export default Persons;
