import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectState(props) {

    const handleStateChange = (event) => {
		props.setState(event.target.value);
        props.setMapOutline('districtPlan')
	};

    return(
        <FormControl fullWidth style={{ width: '10%', margin: '10px 10px', borderRadius: '5px'}}>
            <InputLabel style={{color: 'gray'}}>Select a State</InputLabel>
            <Select
                labelId='select-map'
                id='select-map-dropdown'
                value={props.state}
                label="Select a state"
                onChange={handleStateChange}
                sx={{ backgroundColor:'white' }}
            >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'md'}>Maryland</MenuItem>
                <MenuItem value={'va'}>Virginia</MenuItem>
            </Select>
        </FormControl>
    )

}