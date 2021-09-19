import React from "react";
const Footer = (props) => {
	return (
		<div
			className="paginationMainDiv"
			style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
		>
			<img
				src="https://www.pinclipart.com/picdir/big/581-5814701_transparent-background-left-arrow-clipart.png"
				style={{
					width: "30px",
					height: "30px",
					marginRight: "30px",
					objectFit: "contain",
					cursor: "pointer",
				}}
				onClick={() => props.showLeftRecord()}
			/>

			<p>
				Showing {props.currentPage} - {props.lastPage} of{" "}
				{props.passTotalLength} results
			</p>
			<img
				src="https://www.vhv.rs/dpng/d/411-4113696_high-resolution-black-arrow-png-download-right-arrow.png"
				style={{
					width: "30px",
					height: "30px",
					marginLeft: "30px",
					objectFit: "contain",
					cursor: "pointer",
				}}
				onClick={() => props.showRightRecord()}
			/>
		</div>
	);
};

export default Footer;
