import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navigation(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		if(anchorEl != null) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleClose = (page) => {
		setAnchorEl(null);
		if(page){
			props.setPage(page);
		}
	};
  
	return (
	  <div className='navbar'>
		<Button
		  id="menu-button"
		  aria-controls={open ? 'menu' : undefined}
		  aria-haspopup="true"
		  aria-expanded={open ? 'true' : undefined}
		  onClick={handleClick}
		>
		  Dashboard
		</Button>
		<Menu
		  id="menu"
		  anchorEl={anchorEl}
		  open={open}
		  onClose={() => handleClose(props.page)}
		  MenuListProps={{
			'aria-labelledby': 'menu-button',
		  }}
		>
		  <MenuItem onClick={() => handleClose("gingles1")}>Gingles 1</MenuItem>
		  <MenuItem onClick={() => handleClose("gingles2")}>Gingles 2</MenuItem>
		  <MenuItem onClick={() => handleClose("gingles3")}>Gingles 3</MenuItem>
		  <MenuItem onClick={() => handleClose("compare")}>Compare States</MenuItem>
		</Menu>
	  </div>
	);
  }