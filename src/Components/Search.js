import React, { useState, useEffect, useContext } from "react";
import "./CssFolder/Search.css";
import { Context } from "../App";

const Search = (props) => {
	const [searchterm, setSearchTerm] = useState("");

	// column array
	const [columnArray, setColumnArray] = useState([
		"small",
		"medium",
		"large",
		"heliport",
		"closed",
		"favourites",
	]);

	// UseContext
	const context = useContext(Context);

	// checked state
	const [checked, setChecked] = useState([]);

	// checked useeffect
	useEffect(() => {
		if (checked.length >= 0) {
			context.findCheckedBoxes(checked);
		}
	}, [checked]);

	return (
		<div className="search_MainDiv">
			<div className="search_MainDiv__HeadingContainer">
				<h2 className="search_MainDiv__Heading">
					Filter<span className="search_MainDiv__span"> airports</span>
				</h2>
				<img
					className="logo"
					alt="logo image"
					src="https://static.thenounproject.com/png/2963655-200.png"
				/>
			</div>
			<div className="search_MainDiv__Container">
				<h4 className="search_MainDiv__Type">Type</h4>
				{columnArray &&
					columnArray.map((e, i) => {
						return (
							<>
								<div className="search_MainDiv__filterCheckbox" key={i}>
									<label>
										<input
											type="checkbox"
											id="small"
											name="small"
											value="small"
											checked={checked.includes(e)}
											onChange={(e1) => {
												const checked1 = checked.includes(e);
												setChecked((prev) =>
													checked1
														? prev.filter((sc) => sc !== e)
														: [...prev, e]
												);
											}}
										/>
										{e}
									</label>
								</div>
							</>
						);
					})}

				{/*  */}
				<div className="search_MainDiv__filterSearchBar">
					<h1>Filter by search</h1>
					<input
						className="search"
						placeholder="Search"
						type="text"
						value={searchterm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							props.searchCallBack(e.target.value);
						}}
					/>
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default Search;
