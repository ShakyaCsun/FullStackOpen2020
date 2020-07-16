import React, { useState, useEffect } from "react";
import Axios from "axios";

const Detail = ({ country }) => {
	const defaultWeather = {
		weather_descriptions: "Weather data not found",
		weather_icons: [""],
		temperature: "Temperature data not found",
		wind_dir: "No wind data",
		wind_speed: "No wind data",
	};
	const [weather, setWeather] = useState(defaultWeather);
	useEffect(() => {
		Axios.get(
			`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
		).then((response) => {
			if (response.data.current) {
				setWeather(response.data.current);
			} else {
				setWeather({
					weather_descriptions: "Weather data not found",
					weather_icons: [""],
					temperature: "Temperature data not found",
					wind_dir: "No wind data",
					wind_speed: "No wind data",
				});
			}
		});
	}, [country.capital]);
	return (
		<div>
			<h2>{country.name}</h2>
			<p>
				<b>Capital</b>: {country.capital}
			</p>
			<p>
				<b>Population</b>: {country.population}
			</p>
			<p>
				<b>Languages</b>:
			</p>
			<ul>
				{country.languages.map((language) => {
					return <li key={language.name}>{language.name}</li>;
				})}
			</ul>
			<img src={country.flag} alt={country.name + "'s Flag"} />

			<p>
				<strong>Weather in {country.capital}</strong>{" "}
				{weather.weather_descriptions}
			</p>
			<p>
				<strong>Temperature:</strong> {weather.temperature} Celcius
			</p>
			<img src={weather.weather_icons[0]} alt={weather.weather_descriptions} />
			<p>
				<strong>Wind:</strong> {weather.wind_speed} mph {weather.wind_dir}{" "}
			</p>
		</div>
	);
};

export default Detail;
