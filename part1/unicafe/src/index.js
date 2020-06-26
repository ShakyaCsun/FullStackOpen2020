import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Stat = ({ name, value }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ feedback }) => {
	let feedbackGiven = false;
	for (let key in feedback) {
		if (feedback[key] !== 0) {
			feedbackGiven = true;
			break;
		}
	}
	if (!feedbackGiven) {
		return <div>No feedback given</div>;
	}
	return (
		<table>
			<tbody>
				<Stat name="Good" value={feedback.good} />
				<Stat name="Neutral" value={feedback.neutral} />
				<Stat name="Bad" value={feedback.bad} />
				<Stat name="All" value={feedback.all} />
				<Stat name="Average" value={feedback.average} />
				<Stat name="Positive" value={feedback.positive} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [feedback, setFeedback] = useState({
		good: 0,
		bad: 0,
		neutral: 0,
		all: 0,
		average: 0,
		positive: 0,
	});

	const calculateOther = (newFeedback) => {
		const all = newFeedback.good + newFeedback.bad + newFeedback.neutral;
		return {
			...newFeedback,
			all: all,
			average: (newFeedback.good - newFeedback.bad) / all,
			positive: ((newFeedback.good / all) * 100).toString() + " %",
		};
	};

	const handleGood = () => {
		setFeedback(calculateOther({ ...feedback, good: feedback.good + 1 }));
	};

	const handleNeutral = () =>
		setFeedback(calculateOther({ ...feedback, neutral: feedback.neutral + 1 }));

	const handleBad = () =>
		setFeedback(calculateOther({ ...feedback, bad: feedback.bad + 1 }));

	return (
		<div>
			<Header title="Give Feedback" />
			<Button handleClick={handleGood} text="Good" />
			<Button handleClick={handleNeutral} text="Neutral" />
			<Button handleClick={handleBad} text="Bad" />
			<Header title="Statistics" />
			<Statistics feedback={feedback} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
