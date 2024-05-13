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
			style={{ width: '100%', height: props.height}}>
			<TileLayer
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			>
			</TileLayer>
			<StateFeature 
				state={props.state} 
				districtplan={props.districtplan} 
				precinct={props.precinct}
				mapOutline={props.mapOutline} 
				race={props.race}	
				district={props.district}
				setDistrict={props.setDistrict}
				ensemblePlan={props.ensemblePlan}
			/>
			{ props.mapOutline !== 'districtPlan' && props.mapOutline !== 'ensemble'? <Legend /> : null}
		</MapContainer>
	)
}

function getColor(d) {
    return  d > 40 ? "#e93e3a" : 
            d > 30 ? "#ed683c" : 
            d > 20 ? "#f3903f" : 
            d > 10 ? "#fdc70c" : 
            d > 5 ? "#fff33b" : 
					"#ffffa0";
};

function StateFeature(props) {
	const map = useMap();
	
	const onClick = useCallback((event) => {
		if(props.district !== event.target.feature.properties.districtN){
			props.setDistrict(event.target.feature.properties.districtN);
			// console.log('worked');
		}
	}, [props.district, props.setDistrict]);
	
	const onEachArea = useCallback((area, layer) => {
		layer.on({
			click: onClick
		});
	}, [onClick]);
	
	
	useEffect(() => {
		let center, zoom;
        if (props.state === "md") {
            center = [38.845753, -77.241273];
            zoom = 8;
        } else if (props.state === "va") {
            center = [37.9316, -79.2569];
            zoom = 7;
        } else {
            center = [39.5, -98]; // Default center
            zoom = 4; // Default zoom
        }
        map.setView(center, zoom);

        if (props.precinct && props.mapOutline === 'heatMapP') {
			// console.log(props.precinct.features)
            const geoJsonLayer = L.geoJSON(props.precinct.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					let percentage = 0;
					if (props.mapOutline === 'heatMapP') {
						percentage = feature.properties[props.race]/feature.properties[`demographicTotal`] * 100; 
					}
					let style = {
						color: getColor(percentage), // Base color from heatmap
						weight: percentage < 20 ? 3 : 2
					};

					if(feature.properties.DISTRICTN == props.district){
						style = { color: "#E57200", weight: 5 };
					} 

					return style;
				}
            }).addTo(map);

            return () => {
                map.removeLayer(geoJsonLayer);
            };
        } else if (props.districtplan && props.mapOutline === 'districtPlan') {
            const geoJsonLayer = L.geoJSON(props.districtplan.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					let style = { color: "#002147", weight: 1}

					if(feature.properties.districtN == props.district){
						style = { color: "#E57200", weight: 5 };
					} 

					return style;
				}
            }).addTo(map);

            return () => {
                map.removeLayer(geoJsonLayer);
            };
        } else if (props.districtplan && props.mapOutline === 'heatMapD'){
			const geoJsonLayer = L.geoJSON(props.districtplan.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					let percentage = 0;
					
					percentage = feature.properties[props.race]/feature.properties[`demographicTotal`] * 100; 
					
					let style = {
						color: getColor(percentage), // Base color from heatmap
						weight: percentage < 20 ? 3 : 2
					};

					if(feature.properties.DISTRICTN == props.district){
						style = { color: "#E57200", weight: 5 };
					} 

					return style;
				}
            }).addTo(map);
			return () => {
                map.removeLayer(geoJsonLayer);
            };
		} else if(props.mapOutline === 'ensemble'){
			// console.log(props.ensemblePlan)
			const geoJsonLayer = L.geoJSON(props.ensemblePlan.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					
					const getColor = (id) => {
						const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f']; // Example colors
						// Simple hash function to keep color consistent between renders
						const index = id % colors.length;
						return colors[index];
					};

					// console.log(feature)
					
					let style = {
						color: getColor(feature.properties.district_id), // Base color from heatmap
					};

					return style;
				}
            }).addTo(map);
			return () => {
                map.removeLayer(geoJsonLayer);
            };
		}
    }, [props.districtplan, props.mapOutline, props.race, props.state, props.district, props.precinct, map, onEachArea]);

	return null;
}