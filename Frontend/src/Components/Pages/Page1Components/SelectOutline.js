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
        defaultValue="districtPlan"
        onChange={handleChange}
      >
        <FormControlLabel value="districtPlan" control={<Radio />} label="Default District Plan"/>
        <FormControlLabel value="heatMap" control={<Radio />} label="Heatmap" />
      </RadioGroup>
    </FormControl>
  );
}