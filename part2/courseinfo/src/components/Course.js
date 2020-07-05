import React from "react";
import CourseTitle from "./CourseTitle";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
	return (
		<div>
			<CourseTitle course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	);
};

export default Course;
