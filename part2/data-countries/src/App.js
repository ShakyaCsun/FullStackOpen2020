import React, { useState, useEffect } from "react";
import Axios from "axios";
import Filter from "./components/Filter";
import SearchResult from "./components/SearchResult";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			// console.log("effect");
			// console.log(response);
			setCountries(response.data);
		});
	}, []);

	const filteredCountries = () => {
		let filtered = [];
		if (searchTerm.trim() === "") {
			filtered = [];
		} else {
			filtered = countries.filter((country) =>
				country.name.toLowerCase().includes(searchTerm)
			);
		}
		if (filtered.length > 10) {
			filtered = [];
		}
		return filtered;
	};

	const searchFilter = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	return (
		<div>
			<Filter handleFilter={searchFilter} />
			<SearchResult countries={filteredCountries()} />
		</div>
	);
};

export default App;
