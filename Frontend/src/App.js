import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from "./Components/navigation";
import StateSummary from './Components/Pages/StateSummary';

function App() {
	const [page, setPage] = useState("stateSummary");
	const [state, setState] = useState('');
	const [mapOutline, setMapOutline] = useState('districtPlan');
	const [districtplan, setDistrictplan] = useState(null);

	async function loadDistrictPlan(state) {
		try {
			console.log(mapOutline);
			const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
			setDistrictplan(result.data);
			console.log(result);
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
		if(state && mapOutline) {
			(async () => await loadDistrictPlan(state))();
		} else {
			setDistrictplan(null)
		}
	}, [state, mapOutline]);

	let pageHTML;
	switch(page) {
		case "stateSummary":
			pageHTML = <StateSummary state={state} setState={setState} districtplan={districtplan} mapOutline={mapOutline} setMapOutline={setMapOutline} page={page}/>
			break;
		case "ginglesTests":
			pageHTML = <></>
			break;
		case "ei":
			pageHTML = <></>
			break;
		case "compare":
			pageHTML = <></>
			break;
	}

	return (
		<div className="App">
			<Navigation setPage={setPage} state={state} setState={setState} mapOutline={mapOutline} setMapOutline={setMapOutline}/>
			{pageHTML}
		</div>
	);
}

export default App;
