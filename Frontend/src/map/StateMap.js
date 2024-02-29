import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './statemap.css';
import MarylandState from "../Data/District_Boundaries/md_state.json";
import VirginiaState from "../Data/District_Boundaries/va_state.json";
import mdPopulation from "../Data/District_Boundaries/md_dummy_data.json";
import { Component } from 'react';

class StateMap extends Component{
    constructor(){
        super();
        // this.state = {};
        this.currentState = "maryland";
        this.center = [39.828175 -98.5795];
        this.zoom = 7;
        
    }

    color = ['red', 'green', 'blue', 'yellow', 'orange', 'grey'];

    onDistClick = (event) =>{
        console.log("this works");
    }

    onDistHover = (event) =>{
        event.target.setStyle(
            {
                color: "yellow",
            }
        )
    }
    mouseLeave = (event) =>{
        event.target.setStyle(
            {
                color: "blue",
            }
        )
    }

    onEachDist = (dist, layer) => {
        console.log(dist.properties);
        // layer.bindPopup(dist.properties.DISTRICT);
        // layer.options.fillColor = this.color[Math.floor(5*Math.random())];
        // layer.options.fillOpacity = Math.random();

        const objId = dist.properties.OBJECTID;
        const percent = mdPopulation[objId-1].Asian/mdPopulation[objId-1].Total;
        var distOpacity = "grey";
        if(percent < .1){
            distOpacity = "#accbff";
        }else if(percent >= .1 && percent < .2){
            distOpacity = "#92bbff";
        }else if(percent >= .2 && percent < .3){
            distOpacity = "#78aaff";
        }else if(percent >= .3 && percent < .4){
            distOpacity = "#649eff";
        }else{
            distOpacity = "#4188ff";
        }

        layer.options.fillColor = distOpacity;
        layer.options.fillOpacity = 1;

        layer.on(
            {
                click: this.onDistClick,
                mouseover: this.onDistHover,
                mouseout: this.mouseLeave
            }
        )
    }

    // stateStyle = {

    // }

    render(){
        if(this.currentState === "maryland"){
            this.center = [38.845753, -76.941273];
            this.zoom = 8;
        }else if(this.currentState === "virginia"){
            this.center = [37.4316, -78.6569];
            this.zoom = 7;
        }

        return(
            <MapContainer center={this.center} zoom={this.zoom} scrollWheelZoom={true} minZoom={7} maxZoom={12} style={{display: "inline-block"}}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {this.currentState === "maryland" && <GeoJSON color="blue" data={MarylandState.features} onEachFeature={this.onEachDist}/>}
                {this.currentState === "virginia" && <GeoJSON color="red" data={VirginiaState.features} />}
            </MapContainer>
        )
    }
    
}
export default StateMap;
