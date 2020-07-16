import React, { useState, useEffect } from "react";
import Axios from "axios";
import Filter from "./components/Filter";
import SearchResult from "./components/SearchResult";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [countriesToShow, setCountriesToShow] = useState([]);

	useEffect(() => {
		Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			// console.log("effect");
			// console.log(response);
			setCountries(response.data);
		});
	}, []);

	const filterCountries = (searchTerm) => {
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
		setCountriesToShow(filtered);
	};

	const showCountry = (currCountry) => {
		const handleCurrCountry = () => {
			setCountriesToShow([currCountry]);
		};
		return handleCurrCountry;
	};

	const searchFilter = (event) => {
		filterCountries(event.target.value.toLowerCase());
	};

	return (
		<div>
			<Filter handleFilter={searchFilter} />
			<SearchResult countries={countriesToShow} handleShow={showCountry} />
		</div>
	);
};

export default App;
