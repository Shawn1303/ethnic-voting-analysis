import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectState(props) {

    const handleStateChange = (event) => {
		props.setState(event.target.value);
        props.setMapOutline('DistrictPlan')
	};

    return(
        <FormControl fullWidth style={{ margin: '5px 0', borderRadius: '5px' }}>
            <InputLabel id='select-map-label'>Select a State</InputLabel>
            <Select
                labelId='select-map'
                id='select-map-dropdown'
                value={props.state}
                label="Select a state"
                onChange={handleStateChange}
            >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'md'}>Maryland</MenuItem>
                <MenuItem value={'va'}>Virginia</MenuItem>
            </Select>
        </FormControl>
    )
    
}