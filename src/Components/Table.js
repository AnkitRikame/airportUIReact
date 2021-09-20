import React, { useContext, useState } from "react";
import NoRecords from "../Components/NoRecords";
import "./CssFolder/Table.css";
import { Context } from "../App";

const Table = (props) => {
	const [filterdDataState, setfilterdDataState] = useState([]);

	const context = useContext(Context);
	return (
		<>
			<div className="container-table100">
				<div className="wrap-table100">
					<div className="table100">
						{/* Table Component Starts here*/}
						<table>
							<thead>
								<tr className="table100-head">
									<th>Name</th>
									<th>ICAO</th>
									<th>IATA</th>
									<th>Elev.</th>
									<th>Lat.</th>
									<th>Long.</th>
									<th>Type</th>
								</tr>
							</thead>

							{/* Table body starts here */}
							{props.finalFilter?.length > 0 ? (
								<tbody className="tbody">
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
								</tbody>
							) : (
								<NoRecords />
							)}
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
