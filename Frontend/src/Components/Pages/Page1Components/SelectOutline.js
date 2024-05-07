import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOutline(props) {
  const handleChange = (event) => {
    props.setMapOutline(event.target.value)
  };
  return(
    <FormControl fullWidth style={{ width: '15%', margin: '10px 10px', borderRadius: '5px'}}>
      <Select
        labelId='select-map'
        id='select-map-dropdown'
        value={props.mapOutline}
        onChange={handleChange}
        sx={{ backgroundColor:'white' }}
      >
        <MenuItem value={'districtPlan'}>Default District Plan</MenuItem>
        <MenuItem value={'heatMap'}>Heatmap</MenuItem>
      </Select>
    </FormControl>
  )
}