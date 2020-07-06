import React from "react";

const Filter = ({ handleFilter }) => {
	return (
		<div>
			Filter names with <input onChange={handleFilter} />
		</div>
	);
};

export default Filter;
