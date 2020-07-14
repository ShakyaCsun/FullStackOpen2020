import React from "react";

const Detail = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital {country.capital}</p>
			<p>Population {country.population}</p>
			<p>Languages</p>
			<ul>
				{country.languages.map((language) => {
					return <li key={language.name}>{language.name}</li>;
				})}
			</ul>
			<img src={country.flag} alt={country.name + "'s Flag"} />
		</div>
	);
};

export default Detail;
