import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import maryland from './data/maryland_election_bounds.geojson';

const Map = ()=>{
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }
    return(
         <div className='container'>
            <MapContainer center={[0, 0]} scrollWheelZoom={true} style={mapStyle}>
                <GeoJSON data={maryland.features}/>
            </MapContainer>
        </div>

    )
}
export default Map;
