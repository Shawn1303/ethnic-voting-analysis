import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './statemap.css';
import MarylandState from "../Data/District_Boundaries/md_state.json";
import VirginiaState from "../Data/District_Boundaries/va_state.json";
import mdPopulation from "../Data/District_Boundaries/md_dummy_data.json";
import vaPopulation from "../Data/District_Boundaries/va_dummy_data.json"
import Legend from './Legend';
import legendItems from './LegendItems';

const StateMap = ({selectedState, mapOptions }) => {
    
    var center, zoom;


    const onDistClick = (event) =>{
        // console.log("this works");
    }

    const onDistHover = (event) =>{
        event.target.setStyle(
            {
                color: "orange",
            }
        )
    }
    const mouseLeave = (event) =>{
        event.target.setStyle(
            {
                color: "#03045e",
            }
        )
    }

    const onEachDist = (dist, layer) => {
        
        var percent = 0;
        if(selectedState === "maryland"){
            const objId = dist.properties.OBJECTID;
            percent = mdPopulation[objId-1].Asian/mdPopulation[objId-1].Total;
        }else if (selectedState === "virginia"){
            const objId = dist.properties.ID;
            percent = vaPopulation[objId-1].Asian/vaPopulation[objId-1].Total;
        }

        var fillcolor = "grey";
        if(percent < .1){
            fillcolor = "#caf0f8";
        }else if(percent >= .1 && percent < .2){
            fillcolor = "#90e0ef";
        }else if(percent >= .2 && percent < .3){
            fillcolor = "#00b4d8";
        }else if(percent >= .3 && percent < .4){
            fillcolor = "#0077b6";
        }else{
            fillcolor = "#03045e";
        }

        layer.options.fillColor = fillcolor;
        layer.options.fillOpacity = 1;

        layer.on(
            {
                click: onDistClick,
                mouseover: onDistHover,
                mouseout: mouseLeave
            }
        )
    }

    if(selectedState === "maryland"){
        center = [38.845753, -76.941273];
        zoom = 8;
    }else if(selectedState === "virginia"){
        center = [37.4316, -78.6569];
        zoom = 7;
    }
  
        return(
            <div style={{position:'relative', width: '100%', height: '500px'}}>
                <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} minZoom={7} maxZoom={12} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        style={{position: 'relative'}}
                        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                        // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    >
                    </TileLayer>
                    {selectedState === "maryland" && <GeoJSON color="#03045e" data={MarylandState.features} onEachFeature={onEachDist}/>}
                    {selectedState === "virginia" && <GeoJSON color="#03045e" data={VirginiaState.features} onEachFeature={onEachDist}/>}

                </MapContainer>
                <div style={{position:'absolute', bottom: 0 , right: 0, zIndex:1000, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px'}}>
                    <Legend legendItems={legendItems}/>
                </div>
                
            </div>
        )
    }
export default StateMap;
