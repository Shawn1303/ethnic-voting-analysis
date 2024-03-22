import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import MarylandState from "./Data/District_Boundaries/md_state.json";
import VirginiaState from "./Data/District_Boundaries/va_state.json";

const Map = ({selectedState}) => {

    var center = [39.5, -98], zoom = 5;

    return(
        <div style={{position:'relative', width: '100%', height: '500px'}}>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} minZoom={zoom} maxZoom={12} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                    // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                >
                </TileLayer>
                <StateFeature selectedState={selectedState} />

            </MapContainer>            
        </div>
    )
}

const StateFeature = ({ selectedState }) => {
    const map = useMap();

    useEffect(() => {
        let center, zoom;
        if (selectedState === "md") {
            center = [38.845753, -76.941273];
            zoom = 8;
        } else if (selectedState === "va") {
            center = [37.4316, -78.6569];
            zoom = 7;
        } else {
            center = [39.5, -98]; // Default center
            zoom = 5; // Default zoom
        }

        map.setView(center, zoom);
    }, [selectedState, map]);

    return (
        <>
            {selectedState === "md" && <GeoJSON color="#03045e" data={MarylandState.features} />}
            {selectedState === "va" && <GeoJSON color="#03045e" data={VirginiaState.features} />}
        </>
    );
};

export default Map;