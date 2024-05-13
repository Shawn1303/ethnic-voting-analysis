import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from "./Components/navigation";
import StateSummary from './Components/Pages/StateSummary';
import Gingles from "./Components/Pages/Gingles"
import Ei from './Components/Pages/Ei';
import Ensemble from './Components/Pages/Esemble'
import ensembleMap from './Components/Pages/Page4Components/oppMapAsianMax.json'

function App() {
	const [page, setPage] = useState("stateSummary");
	const [state, setState] = useState('');
	const [mapOutline, setMapOutline] = useState('districtPlan');
	const [districtplan, setDistrictplan] = useState(null);
	const [precinct, setPrecinct] = useState(null);
	const [race, setRace] = useState('');
	const [ep, setEp] = useState(0);
	const [ensemblePlan, setEnsemblePlan] = useState(ensembleMap);

	async function loadDistrictPlan(state) {
		try {
			const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
			if (mapOutline === "heatMapP") {
				setPrecinct(result.data);
			} else {
				setDistrictplan(result.data);
			}
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
        if (districtplan && districtplan.features[0].state !== state && state != '') {
            loadDistrictPlan(state);
        } else if (state && mapOutline !== "heatMapD"){
			loadDistrictPlan(state);
		} 
    }, [state, mapOutline]);

	let pageHTML;
	switch(page) {
		case "stateSummary":
			pageHTML = <StateSummary state={state} districtplan={districtplan} precinct={precinct} mapOutline={mapOutline} race={race} page={page}/>
			break;
		case "ginglesTests":
			pageHTML = <Gingles state={state} race={race} precinct={precinct} setPrecinct={setPrecinct} page={page}/>
			break;
		case "ei":
			pageHTML = <Ei state={state} race={race}/>
			break;
		case "ensemble":
			pageHTML = <Ensemble state={state} districtplan={districtplan} mapOutline={mapOutline} ensemblePlan={ensemblePlan} setEnsemblePlan={setEnsemblePlan}/>
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
				districtplan={districtplan} setDistrictplan={setDistrictplan} 
				precinct={precinct} setPrecinct={setPrecinct} 
				race={race} setRace={setRace}
				ep={ep} setEp={setEp}/>
			{pageHTML}
		</div>
	);
}

export default App;
