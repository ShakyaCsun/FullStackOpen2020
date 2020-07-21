import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import phoneService from "./services/contacts";
import Message from "./components/Message";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [message, setMessage] = useState(null);
	const [type, setType] = useState();

	useEffect(() => {
		// Using a effect hook that is run only for the first render of the component
		phoneService.getAll().then((initialData) => {
			const persons = initialData;
			setPersons(persons);
		});
	}, []);

	const changeMessage = (text, style) => {
		setMessage(text);
		setType(style);
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	};

	const handleNameChange = (event) => {
		// console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		// console.log(event.target.value);
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
			const person = persons.find((person) => person.name === newName);
			const changedPerson = { ...person, number: newNumber };
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				phoneService.update(person.id, changedPerson).then((returnedPerson) => {
					setPersons(
						persons.map((person) =>
							person.name === newName ? returnedPerson : person
						)
					);
					changeMessage(`Updated ${newName}'s Number`, "info");
					setNewName("");
					setNewNumber("");
				});
			}
		} else {
			const newPerson = { name: newName, number: newNumber };
			phoneService.create(newPerson).then((returnedData) => {
				setPersons(persons.concat(returnedData));
				changeMessage(`Added ${newName}`, "info");
				setNewName("");
				setNewNumber("");
			});
		}
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

	const deleteButtonHandler = (id) => {
		const name = persons.find((person) => person.id === id).name;
		if (window.confirm(`Delete ${name} ?`)) {
			phoneService
				.remove(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id));
					changeMessage(`${name} was successfully deleted`, "info");
				})
				.catch(() => {
					changeMessage(
						`${name} has already been removed from server`,
						"error"
					);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Message message={message} type={type} />
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
			<Persons persons={personsToShow} handleDelete={deleteButtonHandler} />
		</div>
	);
};

export default App;
