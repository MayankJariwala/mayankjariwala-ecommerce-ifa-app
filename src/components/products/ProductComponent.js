import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";
import {EMPTY} from "src/constants/values";
import {PageTitleMetaComponent} from "src/components/common/PageTitleMetaComponent";
import {ExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import swal from "sweetalert";
import {CategoriesListResponse} from "src/network/model/responses/CategoryResponseModel";
import {requiredMarked} from "src/utils/Helpers";
import {any, bool, number, shape, string} from "prop-types";
import events from "src/constants/events";
import routes from "src/constants/routes";
import {AdminSessionContext} from "src/context/AdminContext";
import {ProductRequests} from "src/network/requests/ProductRequests";
import {CategoriesRequests} from "src/network/requests/CategoriesRequests";
import Select from "react-select";
import {ProductsCreateResponse} from "src/network/model/responses/ProductResponseModel";

// Using for create and edit
export function ProductComponent(props) {

		let productRequests = new ProductRequests();
		let categoryRequest = new CategoriesRequests();
		const [name, setName] = React.useState(props.editObject.name);
		const [description, setDescription] = React.useState(props.editObject.description);
		const [sku, setSku] = React.useState(props.editObject.sku);
		const [price, setPrice] = React.useState(props.editObject.price);
		const [quantity, setQuantity] = React.useState(props.editObject.quantity);
		const [inProcess, setInProcess] = React.useState(false);
		const [errorMap, setErrorMap] = React.useState({});
		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextState, adminContextDispatcher} = adminContext;
		const [categories, setCategories] = React.useState([]);
		const [productCategories, setProductCategories] = React.useState([]);


		React.useEffect(() => {
				return () => {
						productRequests = null;
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

		function createProduct() {
				if (validate()) {
						const model = {
								name: name,
								description: description,
								sku: sku,
								category_id: productCategories,
								price: price,
								quantity: quantity
						};
						setInProcess(true);
						productRequests.create(null, model).then(value => {
								if (value instanceof ProductsCreateResponse) {
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

		function updateProduct() {
				if (validate()) {
						const model = {
								name: name,
								description: description,
								sku: sku,
								category_id: productCategories,
								price: price,
								quantity: quantity
						};
						productRequests.update(null, model, props.editObject.id).then(value => {
								if (value instanceof ProductsCreateResponse) {
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
												EVENT_NAME: events.PRODUCT.UPDATED
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

		const fetchCategories = () => {
				categoryRequest.fetchAll(null).then(value => {
						if (value instanceof CategoriesListResponse) {
								let map_category = [];
								value.data.map(category => {
										map_category.push({value: category._id, label: category.name});
										return map_category;
								});
								setCategories(map_category);
						} else {
								//handle
						}
				}).catch(reason => {
						console.log("Exception while fetching categories from server");
				});
		};

		React.useEffect(fetchCategories, []);


		return (
				<React.Fragment>
						<PageTitleMetaComponent title={"Create Product"}/>
						<NavigationComponent/>
						<div className="main-content">
								<div className="page-content">
										<div className="container-fluid">
												<div className="row">
														<div className="col-12">
																<div className="page-title-box d-flex align-items-center justify-content-between">
																		<h4 className="mb-0 font-size-18">
																				{props.state.isEditFlag ? `Edit Product: ${props.editObject.name}` : "Create Product"}
																		</h4>
																		<div className="page-title-right">
																				<ol className="breadcrumb m-0">
																						<li className="breadcrumb-item">Admin</li>
																						<li className="breadcrumb-item active">
																								{props.state.isEditFlag ? "Edit Product" : "Create Product"}
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
																								{`${props.state.isEditFlag ? "Updating" : "Creating"} product, please wait....`}
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
																								placeholder={"Please enter product name"}
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
																								placeholder={"Enter product description"}
																						/>
																						{
																								errorMap.hasOwnProperty("description") &&
																								<span className={"text-danger"}>{errorMap.description}</span>
																						}
																				</div>
																				<div className="form-group">
																						<label htmlFor="product_sku">Sku {requiredMarked()}</label>
																						<input
																								type="text"
																								className="form-control"
																								id="product_sku"
																								value={sku}
																								onChange={event => {
																										setSku(event.target.value);
																								}}
																								placeholder={"Please enter product sku"}
																								required={true}
																						/>
																						{
																								errorMap.hasOwnProperty("sku") &&
																								<span className={"text-danger"}>{errorMap.sku}</span>
																						}
																				</div>
																				<div className="form-group">
																						<label htmlFor="auction_end_time">Product
																								Category {requiredMarked()}</label>
																						<Select
																								options={categories}
																								closeMenuOnSelect={false}
																								isMulti={true}
																								onChange={event => {
																										setProductCategories([...event].map(o => o.value));
																								}}
																								placeholder={"Please select product category"}
																								defaultValue=""
																						/>
																						{
																								errorMap.hasOwnProperty("auction_type") &&
																								<span className={"text-danger"}>{errorMap.auction_type}</span>
																						}
																				</div>
																				<div className="form-group">
																						<label htmlFor="product_price">Price {requiredMarked()}</label>
																						<input
																								type="text"
																								className="form-control"
																								id="product_price"
																								value={price}
																								onChange={event => {
																										setPrice(event.target.value);
																								}}
																								placeholder={"Please enter product price"}
																								required={true}
																						/>
																						{
																								errorMap.hasOwnProperty("price") &&
																								<span className={"text-danger"}>{errorMap.price}</span>
																						}
																				</div>
																				<div className="form-group">
																						<label htmlFor="product_qty">Quantity {requiredMarked()}</label>
																						<input
																								type="text"
																								className="form-control"
																								id="product_qty"
																								value={quantity}
																								onChange={event => {
																										setQuantity(event.target.value);
																								}}
																								placeholder={"Please enter product quantity"}
																								required={true}
																						/>
																						{
																								errorMap.hasOwnProperty("quantity") &&
																								<span className={"text-danger"}>{errorMap.quantity}</span>
																						}
																				</div>
																				<button type="button" className="btn btn-primary w-md" onClick={
																						() => props.state.isEditFlag ? updateProduct() : createProduct()
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
																												EVENT_NAME: events.PRODUCT.CANCELLED
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


ProductComponent.defaultProps = {
		editObject: {
				name: EMPTY
		},
		state: {
				isEditFlag: false,
				isCancelled: false
		}
};

ProductComponent.props = {
		eventEmitter: any,
		state: shape({
				isEditFlag: bool.isRequired
		}),
		editObject: shape({
				id: string.isRequired,
				name: string.isRequired,
				description: string,
				sku: string.isRequired,
				category_id: any,
				price: number.isRequired,
				quantity: number.isRequired
		}).isRequired
};
