import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './map/Map';

function App() {
	return (<div>
		<div id = "menu">
			Menu
		</div>
		<div id = "display">
			<Map/>
		</div>
	</div>);
}

export default App;
