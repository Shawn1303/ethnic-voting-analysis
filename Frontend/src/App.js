import './App.css';
import 'leaflet/dist/leaflet.css';
import StateMap from './map/StateMap';

function App() {
	return (<div>
		<div id = "menu">
			Menu
		</div>
		<div id = "display">
			<StateMap/>
		</div>
	</div>);
}

export default App;
