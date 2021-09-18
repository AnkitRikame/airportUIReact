import React, {useContext,useState,useEffect} from 'react';
// import AirportJsonData from '../jsonData/airport.json';
import NoRecords from "../Components/NoRecords";
import './CssFolder/Table.css';
import {Context} from "../App"

const Table = (props) => {

	const [filterdDataState, setfilterdDataState] = useState([])

	useEffect(() => {
		console.log("props.finalFilter value is :" , props.finalFilter);
	})

	// useEffect(() => {
	// 	console.log("props.searchterm is :" + props.searchterm);
	// },[props.searchterm])

	const context = useContext(Context);

	// useEffect(() => {
	// 	const filterdData = AirportJsonData.filter((val) => {
	// 		if (props.searchterm === "") {
	// 			return val;
	// 		} 
	// 		else if(val.name?.toLowerCase().includes(props.searchterm?.toLowerCase()) ||
	// 			val.icao?.toLowerCase().includes(props.searchterm?.toLowerCase()) ||
	// 			val.iata?.toLowerCase().includes(props.searchterm?.toLowerCase()) ||
	// 			val.elevation?.toString()?.toLowerCase().includes(props.searchterm?.toLowerCase()) ||
	// 			val.type?.toLowerCase().includes(props.searchterm?.toLowerCase()) ||
	// 			val.latitude?.toString()?.toLowerCase().includes(props?.searchterm.toLowerCase()) ||
	// 			val.longitude?.toString()?.toLowerCase().includes(props?.searchterm.toLowerCase()) 
	// 		){
	// 			return val;
	// 		}
	// 	})
	// 	setfilterdDataState(filterdData)
	// 	context.filteredCallBack(filterdData);
	// }, [props.searchterm])

	return (
		<>
			<div className="container-table100">
				<div className="wrap-table100">
					<div className="table100">
						<h1>Table Component</h1>
						{/* Table Component Starts here*/}
						<table>
							<thead>
								<tr className="table100-head">
									<th>Name</th>
									<th>ICAO</th>
									<th>IATA</th>
									<th>Elev</th>
									<th>Lat</th>
									<th>Long</th>
									<th>Type</th>
								</tr>
							</thead>

							{/* Table body starts here */}
							{
								props.finalFilter?.length > 0 ? (<tbody className="tbody">
								{props.finalFilter?.map((e) => (
									<tr key={e.id}>
										<td>{e.name}</td>
										<td>{e.icao}</td>
										<td>{e.iata}</td>
										<td>{e.elevation}</td>
										<td>{e.latitude}</td>
										<td>{e.longitude}</td>
										<td>{e.type}</td>
									</tr>
								))}
							</tbody>) : <NoRecords/>
							}
							
							{/* Table body ends here */}
						</table>
						{/* Table Component ends here*/}
					</div>
				</div>
			</div>
		</>
	);
};

export default Table;
