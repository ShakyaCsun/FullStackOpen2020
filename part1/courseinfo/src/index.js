import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
	return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
	return (
		<div>
			<Part
				name={props.course.parts[0].name}
				exercises={props.course.parts[0].exercises}
			/>
			<Part
				name={props.course.parts[1].name}
				exercises={props.course.parts[1].exercises}
			/>
			<Part
				name={props.course.parts[2].name}
				exercises={props.course.parts[2].exercises}
			/>
		</div>
	);
};

const Part = (props) => {
	return (
		<p>
			{props.name} {props.exercises}
		</p>
	);
};

const Total = (props) => {
	return (
		<p>
			Number of exercises{" "}
			{props.course.parts[0].exercises +
				props.course.parts[1].exercises +
				props.course.parts[2].exercises}
		</p>
	);
};

const Display = ({ counter }) => {
	return <div>{counter}</div>;
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const History = ({ allClicks }) => {
	if (allClicks.length === 0) {
		return <div>the app is used by pressing the buttons</div>;
	}

	return <div>button press history: {allClicks.join(" ")}</div>;
};

const App = () => {
	const [counter, setCounter] = useState(0);

	const [left, setLeft] = useState(0);

	const [right, setRight] = useState(0);

	const [allClicks, setAll] = useState([]);

	const increaseByOne = () => setCounter(counter + 1);

	const setToZero = () => setCounter(0);

	const increaseLeft = () => {
		setAll(allClicks.concat("L"));
		setLeft(left + 1);
	};

	const increaseRight = () => {
		setAll(allClicks.concat("R"));
		setRight(right + 1);
	};

	console.log("rendering...", counter);
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
			<Display counter={counter} />
			<Button handleClick={increaseByOne} text="Plus" />
			<Button handleClick={setToZero} text="Zero" />
			<br />
			{left}
			<Button handleClick={increaseLeft} text="LEFT" />
			<Button handleClick={increaseRight} text="RIGHT" />
			{right}
			<History allClicks={allClicks} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
