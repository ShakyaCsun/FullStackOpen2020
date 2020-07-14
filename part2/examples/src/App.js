import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
	const [notes, setNotes] = useState([]);

	// // Alternative Method
	// 	useEffect(() => {
	// 		console.log("effect");

	// 		const eventHandler = (response) => {
	// 			console.log("promise fulfilled");
	// 			setNotes(response.data);
	// 		};

	// 		const promise = axios.get("http://localhost:3001/notes");
	// 		promise.then(eventHandler);
	// 	}, []);

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/notes").then((response) => {
			console.log("promise fulfilled");
			setNotes(response.data);
		});
	}, []); // Here the empty array means useEffect runs only for the first render of App component
	console.log("render", notes.length, "notes");

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
		</div>
	);
};

export default App;
