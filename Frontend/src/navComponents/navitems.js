import { useState } from 'react';

export default function NavItem(props) {
	const [open, setOpen] = useState(false);

	return(
		<li className='nav-item'>
			<a href='#' className='icon-button' onClick={() => setOpen(!open)}>
				{ props.icon }
				<span className='icon-label'> Menu </span>
			</a>
			{open && props.children}
		</li>
	);
}