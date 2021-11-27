import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";
import {PageTitleMetaComponent} from "src/components/common/PageTitleMetaComponent";
import MUIDataTable from "mui-datatables";
import routes from "src/constants/routes";

export function ViewOrderItemsComponent({items}) {


		const options = {
				filterType: "dropdown",
				print: true,
				download: true,
				search: true,
				filter: true,
				viewColumns: false,
				delete: false,
				selectableRows: false,
				rowsPerPage: 20,
				rowsPerPageOptions: [20, 50, 100],
				pagination: true
		};

		const columns = [
				{
						name: "order_id",
						label: "Order ID",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "product_id",
						label: "Product ID",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "quantity",
						label: "Quantity",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "price",
						label: "Price (CAD)"
				}
		];


		return (
				<React.Fragment>
						<PageTitleMetaComponent title={"Orders"}/>
						<NavigationComponent/>
						<div className="main-content">
								<div className="page-content">
										<div className="container-fluid">
												<div className="row">
														<div className="col-12">
																<div
																		className="page-title-box d-flex align-items-center justify-content-between">
																		<h4 className="mb-0 font-size-18">
																				<a href={routes.index}>Orders</a> /
																				Orders Items
																		</h4>
																</div>
														</div>
												</div>
												<div className="row">
														<div className="col-12">
																{
																		items === undefined &&
																		<div className="alert alert-info">
																				Loading Order Items.....
																		</div>
																}
																{
																		items !== undefined &&
																		<React.Fragment>
																				<MUIDataTable
																						title={`Orders Items`}
																						data={items}
																						columns={columns}
																						options={options}
																				/>
																		</React.Fragment>
																}
														</div>
												</div>
										</div>
								</div>
						</div>
				</React.Fragment>
		);
}
