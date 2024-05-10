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
				mapOutline={props.mapOutline} 
				race={props.race}	
				district={props.district}
				setDistrict={props.setDistrict}
			/>
			{ props.mapOutline !== 'districtPlan' ? <Legend /> : null}
		</MapContainer>
	)
}

function getColor(d) {
    return  d > 40 ? "#000094" : 
            d > 30 ? "#11349e" : 
            d > 20 ? "#33559e" : 
            d > 10 ? "#5977aa" : 
            d > 5 ? "#7799be" : 
					"#9dbad4";
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

        if (props.districtplan && props.mapOutline !== 'districtPlan') {
            const geoJsonLayer = L.geoJSON(props.districtplan.features, {
            	onEachFeature: onEachArea,
				style: (feature) => {
					// let style = { color: "#002147", weight: 1}
					let percentage = 0;
					if (props.mapOutline === 'heatMap' || props.mapOutline === 'heatMapD') {
						percentage = feature.properties[props.race]/feature.properties[`registered_voters_total`] * 100; 
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
        }
    }, [props.districtplan, props.mapOutline, props.race, props.state, props.district, map, onEachArea]);

	return null;
}