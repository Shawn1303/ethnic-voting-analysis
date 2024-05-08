import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import va_map from '../../../Data'

export default function StateMap(props) {
	const center = [39.5, -98]; // center of US
	return(
		<MapContainer 
			center={center} 
			zoom={3} 
			style={{ width: '100%', height: '80vh'}}>
			<TileLayer
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			>
			</TileLayer>
			<StateFeature 
				state={props.state} 
				districtplan={props.districtplan}
			/>
		</MapContainer>
	)
}

function StateFeature(props) {
	const map = useMap();

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
				color: "#002147"
            }).addTo(map);

            return () => {
                map.removeLayer(geoJsonLayer);
            };
        }
    }, [props.districtplan, map]);

	let lastClickedArea = null;
	const onClick = (event) =>{
		if(lastClickedArea && lastClickedArea !== event.target){
			lastClickedArea.setStyle({
                color: "#002147",
        	})
			lastClickedArea.clicked = false;
		}
        event.target.setStyle({
            color: "#E57200",
        })
		event.target.clicked = true;
		lastClickedArea = event.target;
    }
	const mouseHover = (event) =>{
        if(!event.target.clicked){
			event.target.setStyle({
				color: "#E57200",
			})
		}
    }
    const mouseLeave = (event) =>{
        if(!event.target.clicked){
			event.target.setStyle({
                color: "#002147",
        	})
		}
    }
	const onEachArea = (area, layer) => {
		layer.on({
			mouseover: mouseHover,
			mouseout: mouseLeave,
			click: onClick
		})
	}
	return null;
}