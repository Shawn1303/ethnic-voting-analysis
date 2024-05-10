import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from "./Components/navigation";
import StateSummary from './Components/Pages/StateSummary';
import Gingles from "./Components/Pages/Gingles"
import Ei from './Components/Pages/Ei';
import Ensemble from './Components/Pages/Esemble'

import va_precinct from "./Components/Pages/Page1Components/va_precinct_data.json"
import va_State from "./Data/District_Boundaries/va_finalized.json"


function App() {
	const [page, setPage] = useState("stateSummary");
	const [state, setState] = useState('');
	const [mapOutline, setMapOutline] = useState('districtPlan');
	const [districtplan, setDistrictplan] = useState(null);
	const [race, setRace] = useState('');

	async function loadDistrictPlan(state) {
		try {
			// console.log(mapOutline);
			const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
			setDistrictplan(result.data);
			// console.log(result);
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
		if(state && mapOutline) {
			if(mapOutline === 'heatMap') setDistrictplan(va_precinct);
			else if(mapOutline === 'heatMapD') setDistrictplan(va_State);
			else (async () => await loadDistrictPlan(state))();
		} else {
			setDistrictplan(null)
		}
	}, [state, mapOutline]);

	let pageHTML;
	switch(page) {
		case "stateSummary":
			pageHTML = <StateSummary state={state} districtplan={districtplan} mapOutline={mapOutline} race={race} page={page}/>
			break;
		case "ginglesTests":
			pageHTML = <Gingles state={state} race={race}/>
			break;
		case "ei":
			pageHTML = <Ei state={state} race={race}/>
			break;
		case "ensemble":
			pageHTML = <Ensemble state={state} districtplan={districtplan} mapOutline={mapOutline}/>
			break;
		case "compare":
			pageHTML = <></>
			break;
	}

	return (
		<div className="App">
			<Navigation page={page} setPage={setPage} state={state} setState={setState} mapOutline={mapOutline} setMapOutline={setMapOutline} race={race} setRace={setRace}/>
			{pageHTML}
		</div>
	);
}

export default App;
