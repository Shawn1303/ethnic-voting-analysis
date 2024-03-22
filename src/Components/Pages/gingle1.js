import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import MDDistrictPlan from "../../Data/District_Boundaries/md_state.json";
import VADistrictPlan from "../../Data/District_Boundaries/va_state.json";

export default function Gingle1(props) {
	const center = [39.5, -98];
	const [districtplan, setDistrictplan] = useState(null);

	async function loadDistrictPlan(state) {
		const result = await axios.get();
		setDistrictplan(result.data);
	}

	// useEffect(() => {
	// 	(async () => await loadDistrictPlan())();
	// }, [props.state]);

	return(
		<MapContainer 
		center={center} 
		zoom={3} 
		// scrollWheelZoom={false}
		style={{ width: '100vw', height: '70vh' }}>
			<TileLayer
				url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
			>
			</TileLayer>
			<StateFeature 
			state={props.state} 
			// districtplan={districtplan}
			/>
		</MapContainer>
	)
}

function StateFeature(props) {
	const map = useMap();

	let center, zoom;
	if (props.state === "md") {
		center = [38.845753, -76.941273];
		zoom = 8;
	} else if (props.state === "va") {
		center = [37.4316, -78.6569];
		zoom = 7;
	} else {
		center = [39.5, -98]; // Default center
		zoom = 5; // Default zoom
	}

	map.setView(center, zoom);

	return (
		<>
			{props.state === "md" && <GeoJSON color="#03045e" data={MDDistrictPlan.features} />}
			{props.state === "va" && <GeoJSON color="#03045e" data={VADistrictPlan.features} />}

			{/* {props.districtplan && <GeoJSON color="#03045e" data={props.districtplan.features} />} */}
		</>
	);
}