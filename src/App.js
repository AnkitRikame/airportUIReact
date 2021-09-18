import React, {useState,createContext,useEffect} from 'react';
import AirportJsonData from './jsonData/airport.json';
import Search from './Components/Search';
// import Footer from './Components/Footer'
import Table from './Components/Table';
import './index.css';

const Context = createContext();
const App = () => {
    const [searchterm, setSearchTerm] = useState("");
	const [filterdata, setFilterData] = useState(AirportJsonData);
	const [checkboxes, setCheckboxes] = useState([]);

	const searchCallBack = (val) =>{
		setSearchTerm(val);
	}

	const filteredCallBack = (fd) =>{
		setFilterData(fd);
		// console.log("Latest New filterdata" , fd);
	}

	useEffect(() => {
		let filtercopy = searchterm.length > 0 ?  filterdata : AirportJsonData;
		let filtered = [];
		if(checkboxes.length > 0){
			filtered = filtercopy.filter((checkboxMatch) => {
				let forFilter = [];
				for(let checkbox of checkboxes){
					// console.log("aaaaaaaaaaaaaaaaaaaaaa " + checkbox);
					if(checkboxMatch.type == checkbox){
						forFilter.push(checkboxMatch)
					}
				}
				return forFilter.length > 0 ? forFilter : null
			})
		}
		if(filtered.length > 0){
			setFilterData(filtered);
		}
		else if(checkboxes.length > 0 ){
			setFilterData([])
		}
	}, [checkboxes]);

	// checked boxes
	const findCheckedBoxes = (cb) =>{
		setCheckboxes(cb);
		// console.log("Checked Data" , cb,checkboxes[0]);
		// let filtercopy = searchterm.length > 0 ?  filterdata : AirportJsonData;
		// let filtered = [];
		// if(checkboxes.length > 0){
		// 	filtered = filtercopy.filter((checkboxMatch) => {
		// 		return checkboxMatch.type == checkboxes[0] 
		// 	})
		// }
		// if(filtered.length > 0){
		// 	setFilterData(filtered);
		// }
	}

	// filterOutCondition
	// const dataFilter = (cb) =>{
	// // console.log("Checked Data" , cb);
	// }

	useEffect(() => {
		// let filterdData = [];
		if(searchterm !== ""){
			let filterdData = AirportJsonData.filter((val) => {
				if (searchterm === "") {
					return val;
				} 
				else if(val.name?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.icao?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.iata?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.elevation?.toString()?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.type?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.latitude?.toString()?.toLowerCase().includes(searchterm.toLowerCase()) ||
					val.longitude?.toString()?.toLowerCase().includes(searchterm.toLowerCase()) 
				){
					return val;
				}
			})
			setFilterData(filterdData);
		}
		// else{
		// 	setFilterData(AirportJsonData);
		// }

		// setfilterdDataState(filterdData)
		// context.filteredCallBack(filterdData);
	}, [searchterm])



	return (
		<Context.Provider value={{filteredCallBack:filteredCallBack , findCheckedBoxes:findCheckedBoxes}} >
			<Search searchCallBack = {searchCallBack} />
			<Table finalFilter = {filterdata} />
			{/* <Footer /> */}
		</Context.Provider>
	);
};

export default App;
export {Context};
