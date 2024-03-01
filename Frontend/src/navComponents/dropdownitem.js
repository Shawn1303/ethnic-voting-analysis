// displays a data representation or checkboxes
export default function DropdownItem(props) {
	// const [data, setData] = useState(null);
	// const [updateData, setUpdateData] = useState(null);

	// useEffect(() => {
	// 	if(props.data && props.setData) {
	// 		setData(props.data);
	// 		setUpdateData(props.setData);
	// 	}
	// }, [props.data, props.setData]);

	const handleCheckboxChange = () => {
		// console.log(props.data);
		props.setData(prevState => ({
		  ...prevState,
		  [props.field]: {
			...prevState[props.field],
			[props.label]: !prevState[props.field][props.label]
		  }
		}));
		// updateData(prevState => ({
		// 	...prevState,
		// 	map: {
		// 		...prevState.map,
		// 		// [props.label]: !(props.data.map[props.label])
		// 		[props.label]: !(data.map[props.label])
		// 	}
		// }));
	};

	// console.log(props);

	let item;
	if(props.checkbox) {
		// console.log(props);
		item =
		<a href='#' className='menu-item'>
			{/* put in props.label for each checkbox item */}
			<input type='checkbox' 
			checked={props.data[props.field][props.label]}
			// check={data.map[props.label]}
			onChange={handleCheckboxChange}
			// onChange={() => {
				// props.setData(prevState => ({
				// updateData(prevState => ({
				// 	...prevState,
				// 	map: {
				// 		...prevState.map,
				// 		// [props.label]: !(props.data.map[props.label])
				// 		[props.label]: !(data.map[props.label])
				// 	}
				// }));
			// }}
			/>
			{props.children}
		</a>
	} else {
		item = <a href='#' className='menu-item' onClick={() => {
			if(props.goToMenu) props.setActiveMenu(props.goToMenu);
			if(props.prevMenu) props.setPrevMenu(props.prevMenu);
			if(props.mainMenu) props.setMainMenu(props.mainMenu);
		}}>
			<span className='icon-left'>{props.leftIcon}</span>
			{props.children}
			{/* <span className='icon-right'>{props.rightIcon}</span> */}
		</a>;

		// if(props.prevMenu === 'main') {
		// 	setData(props.data);
		// 	setUpdateData(props.setData);
		// }
	}
	return(item);
}