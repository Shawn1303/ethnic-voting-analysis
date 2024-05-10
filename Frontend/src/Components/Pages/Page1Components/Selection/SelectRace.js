import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function SelectRace(props) {
  const handleChange = (event) => {
    props.setRace(event.target.value)
  };
  return(
    <FormControl fullWidth style={{ width: '15%', margin: '10px 10px', borderRadius: '5px'}}>
      <InputLabel style={{color: 'gray'}}>Select race/ethnicity</InputLabel>
      <Select
        labelId='select-race'
        id='select-race-dropdown'
        label="Select race/ethnicity"
        value={props.race}
        onChange={handleChange}
        sx={{ backgroundColor:'white' }}
      >
        <MenuItem value={'registered_voters_european'}>White</MenuItem>
        <MenuItem value={'registered_voters_african_american'}>Black/African American</MenuItem>
        <MenuItem value={'registered_voters_south_east_asian'}>Asian</MenuItem>
        <MenuItem value={'registered_voters_hispanic'}>Hispanic/Latino</MenuItem>
      </Select>
    </FormControl>
  )
}