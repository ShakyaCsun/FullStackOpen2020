const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("post-body", (req) => {
	if (req.method === "POST") {
		return JSON.stringify(req.body);
	}
	return " ";
});

app.use(express.json());
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :post-body"
	)
);

const generateRandomId = () => {
	return Math.floor(Math.random() * 100000);
};

let persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1,
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2,
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3,
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4,
	},
	{
		name: "Srishan Shakya",
		number: "9843250183",
		id: 5,
	},
];

// C: Create
app.post("/api/persons", (request, response) => {
	const body = request.body;
	// console.log(body);
	// console.log(!body.name);
	// console.log(!body.number);
	if (!body.name || !body.number) {
		let errorMessage = "Missing [ ";
		if (!body.name) {
			errorMessage = errorMessage + "'name' ";
		}
		if (!body.number) {
			errorMessage = errorMessage + "'number' ";
		}
		errorMessage = errorMessage + "] property.";
		return response.status(400).json({
			error: errorMessage,
		});
	}

	if (persons.some((person) => person.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateRandomId(),
	};

	persons = persons.concat(person);

	response.json(persons);
});

// R: Read
app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.get("/info", (request, response) => {
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
	);
});

// D: Delete
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

// Listening for port 3001
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
