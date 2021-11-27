import React from "react";
import {FooterComponent} from "src/components/common/FooterComponent";
import {Link} from "react-router-dom";
import {AuthRequests} from "src/network/requests/AuthRequests";
import {RegisterResponseModel} from "src/network/model/responses/AuthResponseModel";
import {ExceptionResponse} from "src/network/model/Response";
import {EMPTY} from "src/constants/values";
import {AdminSessionContext} from "src/context/AdminContext";
import routes from "src/constants/routes";
import {RegisterModel} from "src/network/model/request/RegisterModel";
import {requiredMarked} from "src/utils/Helpers";
import Select from "react-select";

export function RegisterComponent() {

		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextDispatcher} = adminContext;


		const [first_name, setFirstName] = React.useState(EMPTY);
		const [last_name, setLastName] = React.useState(EMPTY);
		const [email, setEmail] = React.useState(EMPTY);
		const [password, setPassword] = React.useState(EMPTY);
		const [username, setUsername] = React.useState(EMPTY);
		const [mobile, setMobile] = React.useState(EMPTY);
		const [type, setType] = React.useState(EMPTY);


		const [errorFlag, setErrorFlag] = React.useState(false);
		const [errorFieldName, setErrorFieldName] = React.useState({});

		function validateRegister() {
				const fieldErrorsName = {};
				let validationFlag = true;
				// if (email.trim() === "") {
				// 	fieldErrorsName["email"] = "Please enter a email";
				// 	validationFlag = false;
				// }
				// if (password.trim() === "") {
				// 	fieldErrorsName["password"] = "Please enter a password";
				// 	validationFlag = false;
				// }
				// if (email.trim() !== "" && !validateEmail(email)) {
				// 	fieldErrorsName["email"] = "Please enter a valid email";
				// 	validationFlag = false;
				// }
				setErrorFieldName(fieldErrorsName);
				setErrorFlag(!errorFlag);
				return validationFlag;
		}

		function registerRequest() {
				if (validateRegister()) {
						const register_model = new RegisterModel(
								first_name,
								last_name,
								email,
								username,
								password,
								mobile,
								type
						);
						const authRequest = new AuthRequests();
						authRequest.register(null,register_model).then(value => {
								if (value instanceof RegisterResponseModel) {
										window.location = routes.auth.login;
								} else if (value instanceof ExceptionResponse) {
										const error_message = {
												"server_exception": value.message
										};
										setErrorFieldName(error_message);
								} else {
										const error_message = {
												"server_exception": "Something went wrong. Please contact site administrator"
										};
										setErrorFieldName(error_message);
								}
						}).catch(reason => {
								const error_message = {
										"server_exception": reason.toString()
								};
								setErrorFieldName(error_message);
						});
				}
		}

		React.useEffect(() => {
		}, [errorFlag]);

		return (
				<div className="account-pages my-5 pt-sm-5">
						<div className="container">
								<div className="row justify-content-center">
										<div className="col-md-8 col-lg-6 col-xl-5">
												<div className="card overflow-hidden">
														<div className="bg-soft-primary">
																<div className="row">
																		<div className="col-12">
																				<div className="text-primary p-4">
																						<h5 className="text-primary text-center">E-Commerce Admin Portal:
																								Register</h5>
																				</div>
																		</div>
																</div>
														</div>
														<div className="card-body pt-03">
																{
																		errorFieldName.hasOwnProperty("server_exception") &&
																		<div className={"alert alert-danger"}>
																				{
																						errorFieldName.server_exception
																				}
																		</div>
																}
																<div className="p-2">
																		<div className="form-group">
																				<label htmlFor="first_name">First name {requiredMarked()}</label>
																				<input
																						type="text"
																						className="form-control"
																						id="first_name"
																						value={first_name}
																						placeholder="Enter first name"
																						onChange={event => {
																								setFirstName(event.target.value);
																						}}
																				/>
																				{
																						errorFieldName.hasOwnProperty("first_name") &&
																						<span className={"text-danger"}>*{errorFieldName.first_name}</span>
																				}
																		</div>
																		<div className="form-group">
																				<label htmlFor="last_name">Last name {requiredMarked()}</label>
																				<input
																						type="text"
																						className="form-control"
																						id="last_name"
																						value={last_name}
																						placeholder="Enter last name"
																						onChange={event => {
																								setLastName(event.target.value);
																						}}
																				/>
																				{
																						errorFieldName.hasOwnProperty("email") &&
																						<span className={"text-danger"}>*{errorFieldName.email}</span>
																				}
																		</div>
																		<div className="form-group">
																				<label htmlFor="username">Username {requiredMarked()}</label>
																				<input
																						type="text"
																						className="form-control"
																						id="username"
																						value={username}
																						placeholder="Enter username"
																						onChange={event => {
																								setUsername(event.target.value);
																						}}
																				/>
																				{
																						errorFieldName.hasOwnProperty("username") &&
																						<span className={"text-danger"}>*{errorFieldName.username}</span>
																				}
																		</div>
																		<div className="form-group">
																				<div className="mobile">
																						<label htmlFor="mobile">Mobile {requiredMarked()}</label>
																						<input
																								type="text"
																								className="form-control"
																								id="mobile"
																								value={mobile}
																								placeholder="Enter mobile"
																								onChange={event => {
																										setMobile(event.target.value);
																								}}
																						/>
																						{
																								errorFieldName.hasOwnProperty("mobile") &&
																								<span className={"text-danger"}>*{errorFieldName.mobile}</span>
																						}
																				</div>
																		</div>
																		<div className="form-group">
																				<label htmlFor="email">Email {requiredMarked()}</label>
																				<input
																						type="text"
																						className="form-control"
																						id="email"
																						value={email}
																						placeholder="Enter email address"
																						onChange={event => {
																								setEmail(event.target.value);
																						}}
																				/>
																				{
																						errorFieldName.hasOwnProperty("email") &&
																						<span className={"text-danger"}>*{errorFieldName.email}</span>
																				}
																		</div>
																		<div className="form-group">
																				<label htmlFor="password">Password {requiredMarked()}</label>
																				<input
																						type="password"
																						className="form-control"
																						id="password"
																						value={password}
																						placeholder="Enter password"
																						onChange={event => {
																								setPassword(event.target.value);
																						}}
																				/>
																				{
																						errorFieldName.hasOwnProperty("password") &&
																						<span className={"text-danger"}>*{errorFieldName.password}</span>
																				}
																		</div>
																		<div className="form-group">
																				<label htmlFor="user_type">User Type {requiredMarked()}</label>
																				<Select
																						options={[
																								{
																										"value": "admin",
																										"label": "Admin"
																								},
																								{
																										"value": "user",
																										"label": "User"
																								}
																						]}
																						closeMenuOnSelect={true}
																						isMulti={false}
																						onChange={event => {
																								setType(event.value);
																						}}
																						placeholder={"Please select user type"}
																						defaultValue={type}
																				/>
																				{
																						errorFieldName.hasOwnProperty("type") &&
																						<span className={"text-danger"}>{errorFieldName.type}</span>
																				}
																		</div>
																		<div className="mt-3">
																				<button
																						className="btn btn-primary btn-block waves-effect waves-light"
																						type="button"
																						onClick={() => registerRequest()}
																				>
																						Register
																				</button>
																		</div>
																</div>
														</div>
												</div>
												<FooterComponent>
														<p><Link to={"/admin/login"} className="font-weight-medium text-primary">Already have an
																account ?</Link>
														</p>
												</FooterComponent>
										</div>
								</div>
						</div>
				</div>
		);

}
