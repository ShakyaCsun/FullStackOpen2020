import React from "react";

const Total = ({ course }) => {
	const total = course.parts.reduce((sum, part) => (sum += part.exercises), 0);
	return <strong>Total of {total} exercises</strong>;
};

export default Total;
