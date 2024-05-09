import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Legend from './Legend';
// import va_map from '../../../Data';
// import va from './va_precinct_data.json';

export default function StateMap(props) {
	const center = [39.5, -98]; // center of US
	return(
		<MapContainer 
			center={center} 
			zoom={3} 
			style={{ width: '100%', height: '85vh'}}>
			<TileLayer
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			>
			</TileLayer>
			{/* <GeoJSON data={va.features} /> */}
			<StateFeature state={props.state} districtplan={props.districtplan} mapOutline={props.mapOutline} race={props.race}	/>
			{ props.mapOutline !== 'districtPlan' ? <Legend /> : null}
		</MapContainer>
	)
}

function getColor(d) {
    return  d > 40 ? "#0b5394" : 
            d > 30 ? "#23649e" : 
            d > 20 ? "#3b75a9" : 
            d > 10 ? "#6c97be" : 
            d > 5 ? "#6c97be" : 
            d > 2 ? "#9dbad4" :  
                    "#cedce9";
};

function StateFeature(props) {
	const map = useMap();
	
	let lastClickedArea = useRef(null);
	const onClick = useCallback((event) => {
		if (lastClickedArea.current && lastClickedArea.current !== event.target) {
			if (lastClickedArea.current.setStyle) {
				lastClickedArea.current.setStyle({
					color: "#002147",
				});
			}
			lastClickedArea.current.clicked = false;
		}
		if (event.target) {
			event.target.setStyle({
				color: "#E57200",
			});
			event.target.clicked = true;
			lastClickedArea.current = event.target;
		}
	}, []);
	
	const mouseHover = useCallback((event) => {
		if (event.target && !event.target.clicked) {
			event.target.setStyle({
				color: "#E57200",
			});
		}
	}, []);
	
	const mouseLeave = useCallback((event) => {
		if (event.target && !event.target.clicked) {
			event.target.setStyle({
				color: "#002147",
			});
		}
	}, []);
	const onEachArea = useCallback((area, layer) => {
		layer.on({
			// mouseover: mouseHover,
			// mouseout: mouseLeave,
			click: onClick
		});
	}, [mouseHover, mouseLeave, onClick]);
	
	
	useEffect(() => {
		let center, zoom;
        if (props.state === "md") {
            center = [38.845753, -77.241273];
            zoom = 8;
        } else if (props.state === "va") {
            center = [37.4316, -78.6569];
            zoom = 7;
        } else {
            center = [39.5, -98]; // Default center
            zoom = 4; // Default zoom
        }
        map.setView(center, zoom);

        if (props.districtplan) {
            const geoJsonLayer = L.geoJSON(props.districtplan.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					if (props.mapOutline === 'heatMap' || props.mapOutline === 'heatMapD') {
						const percentage = feature.properties[props.race]/feature.properties[`registered_voters_total`]; // Assuming props.selectedRace is the key for the race
						return {color: getColor(percentage*100)};
					} else {
						return { color: "#002147" }; // Default color
					}
				}
            }).addTo(map);

            return () => {
                map.removeLayer(geoJsonLayer);
            };
        }
    }, [props.districtplan, props.mapOutline, props.race, props.state, map, onEachArea]);

	return null;
}