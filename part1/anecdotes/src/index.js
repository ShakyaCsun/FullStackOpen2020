import React, { useState } from "react";
import ReactDOM from "react-dom";

const Heading = (props) => <h1>{props.titleText}</h1>;

const Anecdote = ({ anecdote, votes }) => {
	return (
		<>
			<p>{anecdote}</p>
			<p>
				<em>has {votes} votes</em>
			</p>
		</>
	);
};

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const App = (props) => {
	const { anecdotes } = props;

	const length = anecdotes.length;

	const [selected, setSelected] = useState(0);

	const [votes, setVotes] = useState(new Array(length).fill(0));

	const randomAnecdote = () => setSelected(pickRandom(length));

	const increaseVote = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
	};

	const bestIndex = votes.indexOf(
		votes.reduce((max, current) => Math.max(max, current))
	);

	return (
		<div>
			<Heading titleText="Anecdote of the day" />
			<Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
			<Button handleClick={randomAnecdote} text="Random Anecdote" />
			<Button handleClick={increaseVote} text="Vote" />
			<br />
			<Heading titleText="Anecdote with most votes" />
			<Anecdote anecdote={anecdotes[bestIndex]} votes={votes[bestIndex]} />
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Programming can be fun, so can cryptography; however they should not be combined.",
	"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const pickRandom = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
