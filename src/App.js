import { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Navigation from "./Components/navigation";
import Gingle1 from './Components/Pages/gingle1';

function App() {
	const [page, setPage] = useState("gingle1");
	const [state, setState] = useState('');

	const handleStateChange = (event) => {
		setState(event.target.value);
	};

	let pageHTML;
	switch(page) {
		case "gingle1":
			pageHTML = <Gingle1 state={state}/>
			break;
		case "gingle2":
			pageHTML = <></>
			break;
		case "gingle3":
			pageHTML = <></>
			break;
		case "compare":
			pageHTML = <></>
			break;
	}

	return (
		<div className="App">
			<Navigation setPage={setPage}/>

			<FormControl fullWidth style={{ margin: '5px 0' }}>
				<InputLabel id='select-map-label'>Select a State</InputLabel>
				<Select
					labelId='select-map'
					id='select-map-dropdown'
					value={state}
					label="Select a state"
					onChange={handleStateChange}
				>
					<MenuItem value={''}>None</MenuItem>
					<MenuItem value={'md'}>Maryland</MenuItem>
					<MenuItem value={'va'}>Virginia</MenuItem>
				</Select>
			</FormControl>

			{pageHTML}
		</div>
	);
}

export default App;
