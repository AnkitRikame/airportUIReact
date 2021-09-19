import React, { useState, createContext, useEffect } from "react";
import AirportJsonData from "./jsonData/airport.json";
import Search from "./Components/Search";
import Footer from "./Components/Footer";
import Table from "./Components/Table";
import "./index.css";

const Context = createContext();
const App = () => {
	const [searchterm, setSearchTerm] = useState("");
	const [filterdata, setFilterData] = useState(AirportJsonData);
	const [checkboxes, setCheckboxes] = useState([]);
	const [paginatedata, setPaginatedata] = useState([]);

	// states for pagination

	const [currentpage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(4);

	let a = currentpage * recordsPerPage + 1;
	const [indexOfLastRecord, setIndexOfLastRecord] = useState(a);

	let b = indexOfLastRecord - recordsPerPage;
	const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(b);

	// showPagination Function

	const showPagination = () => {
		// Logic for displaying current records ....
		const indexOfLastRecord = currentpage * recordsPerPage;
		const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
		const currentRecords = filterdata.slice(
			indexOfFirstRecord,
			indexOfLastRecord
		);
		console.log("currentRecords", currentRecords, "filterdata", filterdata);

		// setFilterData(currentRecords);
		setPaginatedata(currentRecords);
		setIndexOfFirstRecord(indexOfFirstRecord + 1);
		setIndexOfLastRecord(indexOfLastRecord);
	};

	// Callback for setSearch
	const searchCallBack = (val) => {
		setCurrentPage(1);
		setSearchTerm(val);
	};

	const filteredCallBack = (fd) => {
		setFilterData(fd);
	};

	// showLeftRecord
	const showLeftRecord = () => {
		console.log("Left clicked");
		if (currentpage > 1) {
			setCurrentPage(currentpage - 1);
		}
	};

	// showRightRecord
	const showRightRecord = () => {
		if (filterdata.length > indexOfLastRecord) {
			console.log("Right clicked");
			setCurrentPage(currentpage + 1);
		}
	};

	// onFirstTimeLoad
	useEffect(() => {
		showPagination();
	}, []);

	// useEffect for byDefault 4 records .....
	useEffect(() => {
		showPagination();
	}, [searchterm, filterdata, currentpage]);

	useEffect(() => {
		let filtercopy = searchterm.length > 0 ? filterdata : AirportJsonData;
		let filtered = [];

		if (checkboxes.length == 0) {
			setFilterData(filtercopy);
			setCurrentPage(1);
		} else if (checkboxes.length > 0) {
			filtered = filtercopy.filter((checkboxMatch) => {
				let forFilter = [];
				for (let checkbox of checkboxes) {
					if (checkboxMatch.type == checkbox) {
						forFilter.push(checkboxMatch);
					}
				}
				return forFilter.length > 0 ? forFilter : null;
			});
		}

		if (filtered.length > 0) {
			setFilterData(filtered);
		} else if (checkboxes.length > 0) {
			setFilterData([]);
		}
		showPagination();
	}, [checkboxes]);

	// checked boxes
	const findCheckedBoxes = (cb) => {
		setCheckboxes(cb);
		console.log(" *********************", cb);
	};

	useEffect(() => {
		// let filterdData = [];
		if (searchterm !== "") {
			let filterdData = AirportJsonData.filter((val) => {
				if (searchterm === "") {
					return val;
				} else if (
					val.name?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.icao?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.iata?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.elevation
						?.toString()
						?.toLowerCase()
						.includes(searchterm?.toLowerCase()) ||
					val.type?.toLowerCase().includes(searchterm?.toLowerCase()) ||
					val.latitude
						?.toString()
						?.toLowerCase()
						.includes(searchterm.toLowerCase()) ||
					val.longitude
						?.toString()
						?.toLowerCase()
						.includes(searchterm.toLowerCase())
				) {
					return val;
				}
			});
			setFilterData(filterdData);
		}
	}, [searchterm]);

	return (
		<Context.Provider
			value={{
				filteredCallBack: filteredCallBack,
				findCheckedBoxes: findCheckedBoxes,
			}}
		>
			<Search searchCallBack={searchCallBack} />
			<Table finalFilter={paginatedata} />

			{paginatedata.length > 0 ? (
				<Footer
					showLeftRecord={showLeftRecord}
					showRightRecord={showRightRecord}
					passTotalLength={filterdata.length}
					currentPage={indexOfFirstRecord}
					lastPage={
						filterdata.length < 4
							? paginatedata.length
							: paginatedata.length < 4
							? filterdata.length
							: indexOfLastRecord
					}
				/>
			) : null}
		</Context.Provider>
	);
};

export default App;
export { Context };
