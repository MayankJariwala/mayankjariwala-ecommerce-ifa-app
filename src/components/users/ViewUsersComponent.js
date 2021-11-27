import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";
import {PageTitleMetaComponent} from "src/components/common/PageTitleMetaComponent";
import {ExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import routes from "src/constants/routes";
import {AdminSessionContext} from "src/context/AdminContext";
import MUIDataTable from "mui-datatables";
import {UserRequests} from "src/network/requests/UserRequests";
import {UsersListResponse} from "src/network/model/responses/UsersResponseModel";

export function ViewUsersComponent() {

		const userRequests = new UserRequests();

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
						name: "_id",
						label: "Id",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "accountId",
						label: "Account Id",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "first_name",
						label: "First Name",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "last_name",
						label: "Last Name",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "username",
						label: "User Name",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "email",
						label: "Email"
				},
				{
						name: "type",
						label: "User Role"
				},
				{
						name: "createdAt",
						label: "Creation Time",
						options: {
								filter: false,
								sort: false,
								customBodyRender: (value, tableMeta, updateValue) => {
										return (
												<p className="mb-1">
														{new Date(value).toLocaleString(undefined, {timeZone: "Asia/Kolkata"})}
												</p>
										);
								}
						}
				}
		];

		const [users, setUsers] = React.useState(undefined);
		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextState, adminContextDispatcher} = adminContext;
		const [sessionExpireMap, setSessionExpireMap] = React.useState({});


		const logout = _ => {
				setTimeout(() => {
						adminContextDispatcher({
								type: "logout"
						});
						localStorage.removeItem("admin_data");
						localStorage.removeItem("web_session_active");
						window.location = routes.auth.login;
				}, 4000);
		};

		const fetchUsers = () => {
				userRequests.fetchAll(null).then(value => {
						if (value instanceof UsersListResponse) {
								setUsers(value.data);
						} else if (value instanceof UnauthorizedExceptionResponse) {
								setSessionExpireMap({
										error_message: "Your session has expired, redirecting to login in 4 seconds."
								});
								logout();
						} else if (value instanceof ExceptionResponse) {
								setSessionExpireMap({
										error_message: value.exception
								});
						}
				}).catch(reason => {
						console.log(`Caught Categories List exception with reason: ${reason}`);
				});
		};

		React.useEffect(fetchUsers, []);

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
																		<h4 className="mb-0 font-size-18">Users</h4>
																</div>
														</div>
												</div>
												<div className="row">
														<div className="col-12">
																{
																		sessionExpireMap.hasOwnProperty("error_message") &&
																		<div className={"alert alert-danger"}>
																				{sessionExpireMap["error_message"]}
																		</div>
																}
																{
																		users === undefined &&
																		<div className="alert alert-info">
																				Loading Users.....
																		</div>
																}
																{
																		users !== undefined &&
																		<React.Fragment>
																				<MUIDataTable
																						title={`Users`}
																						data={users}
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
