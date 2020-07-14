import React from "react";

const Filter = ({ handleFilter }) => {
	return (
		<div>
			Find Countries <input onChange={handleFilter} />
		</div>
	);
};

export default Filter;
