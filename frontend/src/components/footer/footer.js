import { useEffect, useState } from "react";

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	return (
		<footer>
			<div>{city}, {temperature} градусов, {weather}</div>
		</footer>
	);
}