import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './statemap.css';
import MarylandState from "../Data/District_Boundaries/md_state.json";
import VirginiaState from "../Data/District_Boundaries/va_state.json";
import mdPopulation from "../Data/District_Boundaries/md_dummy_data.json";
import vaPopulation from "../Data/District_Boundaries/va_dummy_data.json"
import Legend from './Legend';
import legendItems from './LegendItems';


const StateMap = ({selectedState, mapOptions, selectedRace }) => {

    const [layerRefs, setLayerRefs] = useState({});

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
        const objId = dist.properties.OBJECTID || dist.properties.ID;
        // if(selectedState === "maryland"){
        //     percent = mdPopulation[objId-1]["American Indian and Alaska Native"]/mdPopulation[objId-1].Total;
        // }else if (selectedState === "virginia"){
        //     percent = vaPopulation[objId-1]["American Indian and Alaska Native"]/vaPopulation[objId-1].Total;
        // }

        setLayerRefs(prevRefs => ({ ...prevRefs, [objId]: layer }));

        // layer.options.fillColor = determineFillColor(percent);
        // layer.options.fillOpacity = 1;

        layer.on(
            {
                click: onDistClick,
                mouseover: onDistHover,
                mouseout: mouseLeave
            }
        )
    }

    useEffect(() => {
        Object.keys(layerRefs).forEach(objId => {
            const layer = layerRefs[objId];
            if(selectedRace === "Select a race/ethnicity"){
                layer.setStyle({
                    fillColor: "bluegray",
                    fillOpacity: 0.3,
                });
            }else{
                let percent = 0;
                if(selectedState === "maryland"){
                    percent = mdPopulation[objId-1][selectedRace]/mdPopulation[objId-1].Total;
                }else if (selectedState === "virginia"){
                    percent = vaPopulation[objId-1][selectedRace]/vaPopulation[objId-1].Total;
                }
                let fillColor = determineFillColor(percent);
                layer.setStyle({
                    fillColor: fillColor,
                    fillOpacity: 1,
                });

            }
            
        });
    }, [selectedRace, selectedState, layerRefs]);

    const determineFillColor = (percent) => {
        if(percent < 0.1) return "#caf0f8";
        else if(percent < 0.2) return "#90e0ef";
        else if(percent < 0.3) return "#00b4d8";
        else if(percent < 0.4) return "#0077b6";
        else return "#03045e";
    };
    

    if(selectedState === "maryland"){
        center = [38.845753, -76.941273];
        zoom = 8;
    }else if(selectedState === "virginia"){
        center = [37.4316, -78.6569];
        zoom = 7;
    }
  
        return(
            <div style={{position:'relative', width: '100%', height: '500px'}}>
                <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} minZoom={7} maxZoom={12} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                        // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    >
                    </TileLayer>
                    {selectedState === "maryland" && <GeoJSON color="#03045e" data={MarylandState.features} onEachFeature={onEachDist}/>}
                    {selectedState === "virginia" && <GeoJSON color="#03045e" data={VirginiaState.features} onEachFeature={onEachDist}/>}

                </MapContainer>
                {selectedRace !== "Select a race/ethnicity" &&<div style={{position:'absolute', bottom: 0 , right: 0, zIndex:1000, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px'}}>
                    <Legend legendItems={legendItems}/>
                </div>}
                
            </div>
        )
    }
export default StateMap;
