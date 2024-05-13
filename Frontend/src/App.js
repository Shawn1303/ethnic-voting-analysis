import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from "./Components/navigation";
import StateSummary from './Components/Pages/StateSummary';
import Gingles from "./Components/Pages/Gingles"
import Ei from './Components/Pages/Ei';
import Ensemble from './Components/Pages/Esemble'

function App() {
	const [page, setPage] = useState("stateSummary");
	const [state, setState] = useState('');
	const [mapOutline, setMapOutline] = useState('districtPlan');
	const [districtplan, setDistrictplan] = useState(null);
	const [race, setRace] = useState('');
	const [ep, setEp] = useState(0);
	const [EnsemblePlan, setEnsemblePlan] = useState(null);

	async function loadDistrictPlan(state) {
		try {
			const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
			setDistrictplan(result.data);
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
		if(state && mapOutline) {
			if(mapOutline !== "heatMapD") (async () => await loadDistrictPlan(state))();
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
			<Navigation 
				page={page} setPage={setPage} 
				state={state} setState={setState} 
				mapOutline={mapOutline} setMapOutline={setMapOutline} 
				race={race} setRace={setRace}
				ep={ep} setEp={setEp}/>
			{pageHTML}
		</div>
	);
}

export default App;
