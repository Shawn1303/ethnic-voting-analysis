import './App.css';
import 'leaflet/dist/leaflet.css';
import StateMap from './map/StateMap';
import HouseMemberTable from './house_member_table';

function App() {
	return (<div>
		<div id = "menu">
			Menu
		</div>
		<div id = "display">
			<StateMap/>
			{/* <HouseMemberTable ></HouseMemberTable> */}
		</div>
	</div>);
}

export default App;
