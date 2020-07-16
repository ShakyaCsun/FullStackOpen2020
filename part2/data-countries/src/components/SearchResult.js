import React from "react";
import Detail from "./CountryDetail";
import Button from "./ShowButton";

const SearchResult = ({ countries, handleShow }) => {
	if (countries.length === 1) {
		const country = countries[0];
		return <Detail country={country} />;
	} else if (countries.length === 0) {
		return <></>;
	} else {
		return countries.map((country) => {
			return (
				<p key={country.name}>
					{country.name} <Button handleClick={handleShow(country)} />
				</p>
			);
		});
	}
};

export default SearchResult;
