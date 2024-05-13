import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOutline(props) {
  const handleChange = (event) => {
    props.setMapOutline(event.target.value);
    props.setRace('demographicWhite');
  };
  return(
    <FormControl fullWidth style={{ width: '12%', margin: '10px 10px', borderRadius: '5px'}}>
      <Select
        labelId='select-map'
        id='select-map-dropdown'
        value={props.mapOutline}
        onChange={handleChange}
        sx={{ backgroundColor:'white' }}
      >
		{/* {props.page === 'stateSummary' ? ( <> */}
		<MenuItem value={'districtPlan'}>Default District Plan</MenuItem>
		<MenuItem value={'heatMapD'}>Heatmap (by District)</MenuItem>
		<MenuItem value={'heatMapP'}>Heatmap (by Precinct)</MenuItem>
		{/* </>) : ( <>
			<MenuItem value={'AsianMax'}>Asian Opp Dist Max</MenuItem>
			<MenuItem value={'AsianMin'}>Asian Opp Dist Min</MenuItem>
			<MenuItem value={'AfricanAmericanMax'}>African American Max</MenuItem>
			<MenuItem value={'AfricanAmericanMin'}>African American Max</MenuItem>
			<MenuItem value={'HispanicMax'}>Hispanic Max</MenuItem>
			<MenuItem value={'HispanicMin'}>Hispanic Min</MenuItem>
		</>)
	} */}
      </Select>
    </FormControl>
  )
}