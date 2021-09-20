import React, { useState, createContext, useEffect } from "react";
import AirportJsonData from "./jsonData/airport.json";
import Search from "./Components/Search";
import Footer from "./Components/Footer";
import Table from "./Components/Table";
import "./index.css";
import "./App.css";

const Context = createContext();
const App = () => {
	const [searchterm, setSearchTerm] = useState("");
	const [filterdata, setFilterData] = useState(AirportJsonData);
	const [checkboxes, setCheckboxes] = useState([]);
	const [paginatedata, setPaginatedata] = useState([]);
	const [currentpage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(4);
	let currpage = currentpage * recordsPerPage + 1;
	const [indexOfLastRecord, setIndexOfLastRecord] = useState(currpage);
	let lastpage = indexOfLastRecord - recordsPerPage;
	const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(lastpage);

	// showPagination Function
	const showPagination = () => {
		// Logic for displaying pagination for current records ....
		const indexOfLastRecord = currentpage * recordsPerPage;
		const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
		const currentRecords = filterdata.slice(
			indexOfFirstRecord,
			indexOfLastRecord
		);

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

	// Callback for FilterSearch
	const filteredCallBack = (fd) => {
		setFilterData(fd);
	};

	// showLeftRecord setCurrent Page to Left
	const showLeftRecord = () => {
		if (currentpage > 1) {
			setCurrentPage(currentpage - 1);
		}
	};

	// showRightRecord setCurrent Page to Right
	const showRightRecord = () => {
		if (filterdata.length > indexOfLastRecord) {
			setCurrentPage(currentpage + 1);
		}
	};

	// onFirstTimeLoad
	useEffect(() => {
		showPagination();
	}, []);

	// useEffect for showing byDefault 4 records .....
	useEffect(() => {
		showPagination();
	}, [searchterm, filterdata, currentpage]);

	// useEffect for showing checkbox is checked and filter the "Type" column
	useEffect(() => {
		let filtercopy = searchterm.length > 0 ? filterdata : AirportJsonData;
		let filtered = [];

		if (checkboxes.length === 0) {
			setFilterData(filtercopy);
			setCurrentPage(1);
		} else if (checkboxes.length > 0) {
			filtered = filtercopy.filter((checkboxMatch) => {
				let forFilter = [];
				for (let checkbox of checkboxes) {
					if (checkboxMatch.type === checkbox) {
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
	};

	// useEffect for search query matches with All records and filter the table records
	useEffect(() => {
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

			{/* Footer conditional showing and hiding based on records found */}
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
