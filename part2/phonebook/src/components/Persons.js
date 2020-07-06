import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Number</th>
				</tr>
			</thead>
			<tbody>
				{persons.map((person) => (
					<Person key={person.name} name={person.name} number={person.number} />
				))}
			</tbody>
		</table>
	);
};

export default Persons;
