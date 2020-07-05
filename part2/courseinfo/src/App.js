import React from "react";
import Course from "./components/Course";
import Header from "./components/Header";

const App = ({ courses }) => {
	return (
		<div>
			<Header name="Web Development Curriculum" />
			{courses.map((course) => (
				<Course key={course.id} course={course} />
			))}
		</div>
	);
};

export default App;
