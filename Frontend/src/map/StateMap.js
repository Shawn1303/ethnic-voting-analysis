import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './statemap.css';
import MarylandState from "../Data/District_Boundaries/md_state.json";
import VirginiaState from "../Data/District_Boundaries/va_state.json";
import { Component } from 'react';

class StateMap extends Component{
    constructor(){
        super();
        // this.state = {};
        this.currentState = "maryland";
        this.center = [39.828175 -98.5795];
        this.zoom = 7;
        
    }

    render(){
        if(this.currentState === "maryland"){
            this.center = [39.045753, -76.641273];
        }else if(this.currentState === "virginia"){
            this.center = [37.4316, -78.6569];
        }

        return(
            <MapContainer center={this.center} zoom={this.zoom} scrollWheelZoom={true} minZoom={7} maxZoom={12}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON color="blue" data={MarylandState}/>
                <GeoJSON color="red" data={VirginiaState}/>
            </MapContainer>
        )

    //     var Stadia_StamenTonerLite = L.tileLayer('', {
	// minZoom: 0,
	// maxZoom: 20,
	// attribution: '&copy; 
	// ext: 'png'
    }
    
}
export default StateMap;
