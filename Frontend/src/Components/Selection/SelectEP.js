import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function SelectEP(props) {
  const handleChange = (event) => {
    props.setEp(event.target.value)
  };
  return(
    <FormControl fullWidth style={{ width: '15%', margin: '10px 10px', borderRadius: '5px'}}>
      <InputLabel style={{color: 'gray'}}>Select race/ethnicity</InputLabel>
      <Select
        labelId='select-ensemble-plan'
        id='select-ensemble-dropdowm'
        label="Select ensemble plan"
        value={props.race}
        onChange={handleChange}
        sx={{ backgroundColor:'white' }}
      >
        <MenuItem value={'demographicWhite'}>White</MenuItem>
        <MenuItem value={'demographicBlack'}>Black/African American</MenuItem>
        <MenuItem value={'demographicAsian'}>Asian</MenuItem>
        <MenuItem value={'demographicHispanicLatino'}>Hispanic/Latino</MenuItem>
      </Select>
    </FormControl>
  )
}