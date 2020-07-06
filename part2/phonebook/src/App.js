import React, { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const handleNameChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const addEntry = (event) => {
		event.preventDefault();
		if (newNumber.trim() === "" || newName.trim() === "") {
			alert("Please enter valid inputs in both Name and Number fields");
			setNewName("");
			setNewNumber("");
			return;
		}
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to Phonebook`);
			return;
		}
		const newPerson = { name: newName, number: newNumber };
		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	const personsToShow =
		searchTerm !== ""
			? persons.filter((person) =>
					person.name.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: persons;

	const nameFilter = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleFilter={nameFilter} />
			<h3>Add a new Entry</h3>
			<Form
				handleSubmitForm={addEntry}
				handleName={handleNameChange}
				handleNumber={handleNumberChange}
				name={newName}
				number={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
