import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SelectOutline(props) {
  const handleChange = (event) => {
    props.setMapOutline(event.target.value)
  };
  return (
    <FormControl>
      <RadioGroup
        row
        name="select-outline-radio-buttons-group"
        defaultValue="DistrictPlan"
        onChange={handleChange}
      >
        <FormControlLabel value="DistrictPlan" control={<Radio />} label="Default District Plan"/>
        <FormControlLabel value="HeatMap" control={<Radio />} label="Heatmap" />
      </RadioGroup>
    </FormControl>
  );
}