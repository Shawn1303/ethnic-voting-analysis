import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import DropdownItem from './dropdownitem';

// Libraries used: fontawesome setup
// CSSTransition library
// https://www.youtube.com/watch?v=IF6k0uZuypA&t=24s

// display all drop downs with transitions
export default function DropdownMenu(props) {
	const [activeMenu, setActiveMenu] = useState('main');
	const [prevMenu, setPrevMenu] = useState(null);
	const [menuHeight, setMenuHeight] = useState(null);
	const [mainMenu, setMainMenu] = useState(null);
	// const [data, setData] = useState(null);
	// const [updateData, setUpdateData] = useState(null);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	// function DropdownItem(props) {
	// 	const [data, setData] = useState(null);
	// 	const [updateData, setUpdateData] = useState(null);

	// 	let item;
	// 	if(props.checkbox) {
	// 		item =
	// 		<a href='#' className='menu-item'>
	// 			{/* put in props.label for each checkbox item */}
	// 			<input type='checkbox' 
	// 			// check={props.data.map[props.label]}
	// 			check={data.map[props.label]}
	// 			onChange={() => {
	// 				// props.setData(prevState => ({
	// 				updateData(prevState => ({
	// 					...prevState,
	// 					map: {
	// 						...prevState.map,
	// 						// [props.label]: !(props.data.map[props.label])
	// 						[props.label]: !(data.map[props.label])
	// 					}
	// 				}));
	// 			}}
	// 			/>
	// 			{props.children}
	// 		</a>
	// 	} else {
	// 		item = <a href='#' className='menu-item' onClick={() => {
	// 			if(props.goToMenu) props.setActiveMenu(props.goToMenu);
	// 			if(props.prevMenu) props.setPrevMenu(props.prevMenu);
	// 		}}>
	// 			<span className='icon-left'>{props.leftIcon}</span>
	// 			{props.children}
	// 			{/* <span className='icon-right'>{props.rightIcon}</span> */}
	// 		</a>;

	// 		if(props.prevMenu === 'main') {
	// 			setData(props.data);
	// 			setUpdateData(props.setData);
	// 		}
	// 	}
	// 	return(item);
	// }

	return (
		<div className='dropdown' style={{ height: menuHeight }}>
			{/* main menu first layer*/}
			<CSSTransition 
			in={activeMenu === 'main'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-primary"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="maryland"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
						// data={props.marylandData}
						// setData={props.setMarylandData}
						mainMenu="maryland"
						setMainMenu={setMainMenu}
					>Maryland</DropdownItem>
					<DropdownItem
						goToMenu="virginia"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
						// data={props.virginiaData}
						// setData={props.setVirginiaData}
						mainMenu="virginia"
						setMainMenu={setMainMenu}
					>Virginia</DropdownItem>
				</div>
			</CSSTransition>

			{/* state menu second layer*/}
			{/* <CSSTransition 
			in={activeMenu === 'state'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
					>Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
					>Box and Whiskers</DropdownItem>
					<DropdownItem
						goToMenu="barchart"
						prevMenu={activeMenu}
					>Bar Chart</DropdownItem>
				</div>
			</CSSTransition> */}

			<CSSTransition 
			in={activeMenu === 'maryland'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Box and Whiskers</DropdownItem>
					<DropdownItem
						goToMenu="barchart"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Bar Chart</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'virginia'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Box and Whiskers</DropdownItem>
					<DropdownItem
						goToMenu="barchart"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Bar Chart</DropdownItem>
				</div>
			</CSSTransition>

			{/* all data menu third layer */}
			<CSSTransition 
			in={activeMenu === 'map'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						checkbox={true}
						// put label name e.g. show
						label={"show"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Map</DropdownItem>
					<DropdownItem
						checkbox={true}
						// put label name e.g. legislative
						label={"legislative"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Legislative Districts</DropdownItem>
					<DropdownItem
						checkbox={true}
						label={"precinct"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Precinct Grouping</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'boxandwhiskers'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						checkbox={true}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Box and Whiskers Chart</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'barchart'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						checkbox={true}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Bar Chart</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}