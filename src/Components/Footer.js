import React from "react";
import "./CssFolder/Footer.css";
const Footer = (props) => {
	return (
		<>
			<div className="paginationMainDiv">
				<img
					className="paginationMainDiv__leftarrow"
					alt="image left"
					src="https://www.pinclipart.com/picdir/big/581-5814701_transparent-background-left-arrow-clipart.png"
					onClick={() => props.showLeftRecord()}
				/>

				{/* Display Footer Data current Page and Last Page with Total Records*/}
				<p className="paginationMainDiv__MiddleText">
					Showing <span>{props.currentPage}</span> -{" "}
					<span>{props.lastPage} </span>of{" "}
					<span> {props.passTotalLength} </span> results
				</p>
				<img
					className="paginationMainDiv__rightarrow"
					alt="image right"
					src="https://www.vhv.rs/dpng/d/411-4113696_high-resolution-black-arrow-png-download-right-arrow.png"
					onClick={() => props.showRightRecord()}
				/>
			</div>
		</>
	);
};

export default Footer;
