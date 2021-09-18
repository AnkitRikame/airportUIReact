import React, { useState,useEffect,useContext } from 'react';
import './CssFolder/Search.css';
import {Context} from "../App"


// const context = useContext(Context);

const Search = (props) => {
	const [searchterm, setSearchTerm] = useState('');

	// column array
	const [columnArray, setColumnArray] = useState([
		"small" , 
		"medium",
		"large",
		"heliport",
		"closed",
		"favourites"
	]);

	const context = useContext(Context);
	// checked state
	const [checked,setChecked] = useState([]);

	// checked useeffect
	useEffect(() => {
		if(checked.length > 0){
			console.log("Checked added " + checked);
			context.findCheckedBoxes(checked);	
		}
	}, [checked]);


	return (
		<div className="search_MainDiv">
			<h2 className="search_MainDiv__Heading">
				Filter<span className="search_MainDiv__span"> airports</span>
			</h2>
			<div className="search_MainDiv__Container" >
			<h4 className="search_MainDiv__Type">Type</h4>
				{
					columnArray && columnArray.map((e,i) => {
						return (
							<>
							{/* <h2 className="search_MainDiv__Type">Type</h2> */}
							<div className="search_MainDiv__filterCheckbox" key={i} >
								<label>
									<input type="checkbox" id="small" name="small" value="small" 
									checked={checked.includes(e)} 
									onChange={(e1) => {
									const checked1 = checked.includes(e)
									setChecked(prev => checked1 ? prev.filter((sc) => sc !== e ) : [...prev,e]);
									}} 
									/>
									{e}
								</label>
							</div>
							</>
						)
					})
				}

				{/* <div className="search_MainDiv__filterCheckbox">
					<h2 className="search_MainDiv__Type">Type</h2>
					<input type="checkbox" id="small" name="small" value="small" />
					Small
					<input type="checkbox" id="medium" name="medium" value="medium" />
					Medium
					<input type="checkbox" id="large" name="large" value="large" />
					Large
					<input type="checkbox" id="heliport" name="heliport" value="heliport" />
					Heliport
					<input type="checkbox" id="closed" name="closed" value="closed" />
					Closed
					<input type="checkbox" id="favourites" name="favourites" value="favourites" />
					In your favourites
				</div> */}

				{/*  */}
				<div className="search_MainDiv__filterSearchBar">
					<h1>Filter by search</h1>
					<input
						className="search"
						placeholder="Search"
						type="text"
						value = {searchterm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							props.searchCallBack(e.target.value);
							console.log(e.target.value);
						}}
					/>
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default Search;
