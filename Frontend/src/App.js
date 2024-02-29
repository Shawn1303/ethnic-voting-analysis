import './App.css';
import 'leaflet/dist/leaflet.css';
import StateMap from './map/StateMap';
import HouseMemberTable from './house_member_table';
import RacialBarPlots from './racial_ethnic_district_bar_plots';
import Legend from './map/Legend';
import legendItems from './map/LegendItems';


function App() {
	return (<div>
		<div id = "menu">
			Menu
		</div>
		<div id = "display">
			<StateMap/>
			<Legend legendItems={legendItems}/>
			<HouseMemberTable/>
			<RacialBarPlots />
			
		</div>
	</div>);
}

export default App;
