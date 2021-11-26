import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";
import {EMPTY} from "src/constants/values";
import {PageTitleMetaComponent} from "src/components/common/PageTitleMetaComponent";
import {ExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import swal from "sweetalert";
import {CategoriesRequests} from "src/network/requests/CategoriesRequests";
import {CategoryCreateResponse} from "src/network/model/responses/CategoryResponseModel";
import {requiredMarked} from "src/utils/Helpers";
import {any, bool, shape, string} from "prop-types";
import events from "src/constants/events";
import routes from "src/constants/routes";
import {AdminSessionContext} from "src/context/AdminContext";

// Using for create and edit
export function CategoryComponent(props) {

		let categoriesRequests = new CategoriesRequests();
		const [name, setName] = React.useState(props.editObject.name);
		const [description, setDescription] = React.useState(props.editObject.description);
		const [inProcess, setInProcess] = React.useState(false);
		const [errorMap, setErrorMap] = React.useState({});
		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextState, adminContextDispatcher} = adminContext;


		React.useEffect(() => {
				return () => {
						categoriesRequests = null;
				};
		}, []);

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

		function validate() {
				let validation_flag = true;
				let error_map = {};
				if (name.trim() === EMPTY) {
						error_map["name"] = "*Please enter name of the category";
						validation_flag = false;
				}
				if (!validation_flag) {
						setErrorMap(error_map);
				} else {
						setErrorMap({});
				}
				return validation_flag;
		}

		function createCategory() {
				if (validate()) {
						const model = {
								name: name,
								description: description
						};
						setInProcess(true);
						categoriesRequests.create(null, model).then(value => {
								if (value instanceof CategoryCreateResponse) {
										swal({
												icon: "success",
												text: value.message,
												timer: 2000
										}).catch(reason => {
												let success_message = {
														isError: false,
														server_message: value.message
												};
												setErrorMap(success_message);
										});
										setName(EMPTY);
								} else if (value instanceof ExceptionResponse) {
										let error_map = {
												isError: true,
												server_message: value.message
										};
										setErrorMap(error_map);
								} else if (value instanceof UnauthorizedExceptionResponse) {
										setErrorMap({
												isError: true,
												server_message: "Your session has expired, redirecting to login in 4 seconds."
										});
										logout();
								}
								setInProcess(false);
						}).catch(reason => {
								console.log(`Exception: ${reason.toString()}`);
								let error_map = {
										isError: true,
										server_message: reason.toString()
								};
								setErrorMap(error_map);
								setInProcess(false);
						});
				}
		}

		function updateCategory() {
				if (validate()) {
						const model = {
								name: name,
								description: description
						};
						categoriesRequests.update(null, model, props.editObject.id).then(value => {
								if (value instanceof CategoryCreateResponse) {
										swal({
												icon: "success",
												text: value.message,
												timer: 2000
										}).catch(reason => {
												let success_message = {
														isError: false,
														server_message: value.message
												};
												setErrorMap(success_message);
										});
										setName(EMPTY);
										props.eventEmitter.emit({
												EVENT_NAME: events.CATEGORY.UPDATED
										});
								} else if (value instanceof UnauthorizedExceptionResponse) {
										setErrorMap({
												isError: true,
												server_message: "Your session has expired, redirecting to login in 4 seconds."
										});
										logout();
								} else if (value instanceof ExceptionResponse) {
										let error_map = {
												isError: true,
												server_message: value.message
										};
										setErrorMap(error_map);
								}
								setInProcess(false);
						}).catch(reason => {
								console.log(`Exception: ${reason.toString()}`);
								let error_map = {
										isError: true,
										server_message: reason.toString()
								};
								setErrorMap(error_map);
								setInProcess(false);
						});
				}
		}

		return (
				<React.Fragment>
						<PageTitleMetaComponent title={"Create Category | DLive Admin"}/>
						<NavigationComponent/>
						<div className="main-content">
								<div className="page-content">
										<div className="container-fluid">
												<div className="row">
														<div className="col-12">
																<div className="page-title-box d-flex align-items-center justify-content-between">
																		<h4 className="mb-0 font-size-18">
																				{props.state.isEditFlag ? `Edit Category: ${props.editObject.name}` : "Create Category"}
																		</h4>
																		<div className="page-title-right">
																				<ol className="breadcrumb m-0">
																						<li className="breadcrumb-item">Admin</li>
																						<li className="breadcrumb-item active">
																								{props.state.isEditFlag ? "Edit Category" : "Create Category"}
																						</li>
																				</ol>
																		</div>
																</div>
														</div>
												</div>
												<div className="row">
														<div className="col-lg-12">
																<div className="card">
																		<div className="card-body">
																				<p className={"text-danger"}>Required Fields (*)</p>
																				{
																						errorMap.hasOwnProperty("server_message") &&
																						<p className={`alert alert-${errorMap.isError ? "success" : "danger"}`}>
																								{errorMap.server_message}
																						</p>
																				}
																				{
																						inProcess &&
																						<p className={`alert alert-info`}>
																								{`${props.state.isEditFlag ? "Updating" : "Creating"} category, please wait....`}
																						</p>
																				}
																				<div className="form-group">
																						<label htmlFor="category_name">Name {requiredMarked()}</label>
																						<input
																								type="text"
																								className="form-control"
																								id="category_name"
																								value={name}
																								onChange={event => {
																										setName(event.target.value);
																								}}
																								placeholder={"Please enter product category name"}
																								required={true}
																						/>
																						{
																								errorMap.hasOwnProperty("name") &&
																								<span className={"text-danger"}>{errorMap.name}</span>
																						}
																				</div>
																				<div className="form-group">
																						<label htmlFor="category_name">Description</label>
																						<textarea
																								rows={6}
																								className="form-control"
																								id="category_description"
																								value={description}
																								onChange={event => {
																										setDescription(event.target.value);
																								}}
																								placeholder={"Enter product category description"}
																						/>
																						{
																								errorMap.hasOwnProperty("description") &&
																								<span className={"text-danger"}>{errorMap.description}</span>
																						}
																				</div>

																				<button type="button" className="btn btn-primary w-md" onClick={
																						() => props.state.isEditFlag ? updateCategory() : createCategory()
																				}>
																						{props.state.isEditFlag ? "Update" : "Create"}
																				</button>
																				{
																						props.state.isEditFlag &&
																						<button
																								type="button"
																								className="ml-2 btn btn-danger w-md"
																								onClick={() => {
																										props.eventEmitter.emit({
																												EVENT_NAME: events.CATEGORY.CANCELLED
																										});
																								}}>
																								Cancel
																						</button>
																				}
																		</div>
																</div>
														</div>
												</div>
										</div>
								</div>
						</div>
				</React.Fragment>
		);
}


CategoryComponent.defaultProps = {
		editObject: {
				name: EMPTY
		},
		state: {
				isEditFlag: false,
				isCancelled: false
		}
};

CategoryComponent.props = {
		eventEmitter: any,
		state: shape({
				isEditFlag: bool.isRequired
		}),
		editObject: shape({
				id: string.isRequired,
				name: string.isRequired,
				description: string
		}).isRequired
};
