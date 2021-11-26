import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";
import {PageTitleMetaComponent} from "src/components/common/PageTitleMetaComponent";
import {CategoriesRequests} from "src/network/requests/CategoriesRequests";
import {CategoriesListResponse, CategoryDeleteResponse} from "src/network/model/responses/CategoryResponseModel";
import {ExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import swal from "sweetalert";
import {CategoryComponent} from "src/components/products_category/CategoryComponent";
import {useEventEmitter} from "dreampact";
import events from "src/constants/events";
import routes from "src/constants/routes";
import {AdminSessionContext} from "src/context/AdminContext";
import MUIDataTable from "mui-datatables";

export function ViewCategoriesComponent() {

		const categoriesRequests = new CategoriesRequests();
		const [isEditFlag, setIsEditFlag] = React.useState(false);
		const eventEmitter = useEventEmitter();
		const [editObject, setEditObject] = React.useState({});

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
						name: "name",
						label: "Name",
						options: {
								filter: false,
								sort: false
						}
				},
				{
						name: "description",
						label: "Description",
						options: {
								filter: false,
								sort: false
						}
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
				},
				{
						name: "_",
						label: "Action",
						options: {
								filter: false,
								sort: false,
								customBodyRender: (value, tableMeta, updateValue) => {
										const record = tableMeta.tableData[tableMeta.rowIndex];
										return (
												<span className={"justify-space-between"}>
				 		<i className={"mdi mdi-pencil text-primary font-size-18 pointer-cursor p-1"} role={"button"}
					     onClick={() => {
							     setIsEditFlag(true);
							     setEditObject(record);
					     }}/>
							<i className={"mdi mdi-delete text-danger font-size-18 pointer-cursor p-1"} role={"button"}
							   onClick={() => deleteCategory(record._id)}/>
					</span>
										);
								}
						}
				}
		];

		const [categories, setCategories] = React.useState(undefined);
		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextState, adminContextDispatcher} = adminContext;
		const [sessionExpireMap, setSessionExpireMap] = React.useState({});

		function onEvent(data) {
				switch (data["EVENT_NAME"]) {
						case events.CATEGORY.CANCELLED:
								setIsEditFlag(false);
								break;
						case events.CATEGORY.UPDATED:
								setIsEditFlag(false);
								fetchCategories();
								break;
						case events.CATEGORY.DELETED:
								fetchCategories();
								break;
				}
		}

		eventEmitter.useSubscription(onEvent);

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

		function deleteCategory(category_id: string) {
				const status = window.confirm("You sure want to delete category?");
				if (status) {
						categoriesRequests.delete(null, category_id).then(value => {
								if (value instanceof CategoryDeleteResponse) {
										swal({
												icon: "success",
												text: "Category deleted Successfully",
												timer: 2000
										}).catch(reason => {
												alert("Category deleted Successfully");
										});
										eventEmitter.emit({
												EVENT_NAME: events.CATEGORY.DELETED
										});
								} else if (value instanceof UnauthorizedExceptionResponse) {
										setSessionExpireMap({
												error_message: "Your session has expired, redirecting to login in 4 seconds."
										});
										logout();
								} else if (value instanceof ExceptionResponse) {
										setSessionExpireMap({
												error_message: value.hasOwnProperty("message") ? value.message : value.exception
										});
								}
						}).catch(reason => {
								alert("Please try again. If still does not work then contact site administrator");
								console.log(`Exception while deleting the category with reason: ${reason}`);
						});
				}
		}

		const fetchCategories = () => {
				categoriesRequests.fetchAll(null).then(value => {
						if (value instanceof CategoriesListResponse) {
								setCategories(value.data);
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

		React.useEffect(fetchCategories, []);

		function editPageComponent() {
				return <CategoryComponent
						eventEmitter={eventEmitter}
						state={{
								isEditFlag: isEditFlag
						}}
						editObject={{
								id: editObject._id,
								name: editObject.name,
								description: editObject.description
						}}
				/>;
		}

		return (
				<React.Fragment>
						<PageTitleMetaComponent title={"Product Categories"}/>
						<NavigationComponent/>
						{
								isEditFlag ?
										editPageComponent() :
										<div className="main-content">
												<div className="page-content">
														<div className="container-fluid">
																<div className="row">
																		<div className="col-12">
																				<div
																						className="page-title-box d-flex align-items-center justify-content-between">
																						<h4 className="mb-0 font-size-18">Product Categories</h4>
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
																						categories !== undefined &&
																						<React.Fragment>
																								<MUIDataTable
																										title={`Categories`}
																										data={categories}
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
						}
				</React.Fragment>
		);
}
