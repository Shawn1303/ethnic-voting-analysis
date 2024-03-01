import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './statemap.css';
import MarylandState from "../Data/District_Boundaries/md_state.json";
import VirginiaState from "../Data/District_Boundaries/va_state.json";
import mdPopulation from "../Data/District_Boundaries/md_dummy_data.json";
import vaPopulation from "../Data/District_Boundaries/va_dummy_data.json"
import { Component } from 'react';
import Legend from './Legend';
import legendItems from './LegendItems';

class StateMap extends Component{
    constructor(){
        super();
        // this.state = {};
        this.currentState = "virginia";
        this.center = [39.828175 -98.5795];
        this.zoom = 7;
        
    }

    color = ['red', 'green', 'blue', 'yellow', 'orange', 'grey'];

    onDistClick = (event) =>{
        // console.log("this works");
    }

    onDistHover = (event) =>{
        event.target.setStyle(
            {
                color: "orange",
            }
        )
    }
    mouseLeave = (event) =>{
        event.target.setStyle(
            {
                color: "#03045e",
            }
        )
    }

    onEachDist = (dist, layer) => {
        // console.log(dist.properties);
        // layer.bindPopup(dist.properties.DISTRICT);
        // layer.options.fillColor = this.color[Math.floor(5*Math.random())];
        // layer.options.fillOpacity = Math.random();

        

        
        var percent = 0;
        if(this.currentState === "maryland"){
            const objId = dist.properties.OBJECTID;
            percent = mdPopulation[objId-1].Asian/mdPopulation[objId-1].Total;
        }else if (this.currentState === "virginia"){
            const objId = dist.properties.ID;
            percent = vaPopulation[objId-1].Asian/vaPopulation[objId-1].Total;
        }

        var distOpacity = "grey";
        if(percent < .1){
            distOpacity = "#caf0f8";
        }else if(percent >= .1 && percent < .2){
            distOpacity = "#90e0ef";
        }else if(percent >= .2 && percent < .3){
            distOpacity = "#00b4d8";
        }else if(percent >= .3 && percent < .4){
            distOpacity = "#0077b6";
        }else{
            distOpacity = "#03045e";
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
            <div style={{position:'relative', width: '100%', height: '500px'}}>
                <MapContainer center={this.center} zoom={this.zoom} scrollWheelZoom={true} minZoom={7} maxZoom={12} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        style={{position: 'relative'}}
                        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                        // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    >
                    </TileLayer>
                    {this.currentState === "maryland" && <GeoJSON color="#03045e" data={MarylandState.features} onEachFeature={this.onEachDist}/>}
                    {this.currentState === "virginia" && <GeoJSON color="#03045e" data={VirginiaState.features} onEachFeature={this.onEachDist}/>}

                </MapContainer>
                <div style={{position:'absolute', bottom: 0 , right: 0, zIndex:1000, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px'}}>
                    <Legend legendItems={legendItems}/>
                </div>
                
            </div>
        )
    }
    
}
export default StateMap;
