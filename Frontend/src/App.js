import './App.css';
import 'leaflet/dist/leaflet.css';
import StateMap from './map/StateMap';
import HouseMemberTable from './graphs/house_member_table';
import RacialBarPlots from './graphs/racial_ethnic_district_bar_plots';
import BoxWhiskerPlotsMCMC from './graphs/box_whisker_plots_MCMC';
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
			<BoxWhiskerPlotsMCMC/>
		</div>
	</div>);
}

export default App;
