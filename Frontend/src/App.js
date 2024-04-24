import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from "./Components/navigation";
import Gingles1 from './Components/Pages/gingles1';

function App() {
	const [page, setPage] = useState("gingles1");
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
		case "gingles1":
			pageHTML = <Gingles1 state={state} setState={setState} districtplan={districtplan} mapOutline={mapOutline} setMapOutline={setMapOutline} page={page}/>
			break;
		case "gingles2":
			pageHTML = <></>
			break;
		case "gingles3":
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
