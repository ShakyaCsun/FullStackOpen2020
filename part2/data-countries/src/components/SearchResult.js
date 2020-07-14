import React from "react";
import Detail from "./CountryDetail";

const SearchResult = ({ countries }) => {
	if (countries.length === 1) {
		const country = countries[0];
		return <Detail country={country} />;
	} else if (countries.length === 0) {
		return <></>;
	} else {
		return countries.map((country) => <p key={country.name}>{country.name}</p>);
	}
};

export default SearchResult;
