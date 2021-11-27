import React from "react";
import {FooterComponent} from "src/components/common/FooterComponent";
import {validateEmail} from "src/utils/Helpers";
import {Link} from "react-router-dom";
import {LoginModel} from "src/network/model/request/LoginModel";
import {AuthRequests} from "src/network/requests/AuthRequests";
import {LoginResponseModel} from "src/network/model/responses/AuthResponseModel";
import {ExceptionResponse} from "src/network/model/Response";
import {EMPTY} from "src/constants/values";
import {AdminSessionContext} from "src/context/AdminContext";
import routes from "src/constants/routes";

export function LoginComponent() {

		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextDispatcher} = adminContext;


		const [email, setEmail] = React.useState(EMPTY);
		const [password, setPassword] = React.useState(EMPTY);

		const [errorFlag, setErrorFlag] = React.useState(false);
		const [errorFieldName, setErrorFieldName] = React.useState({});

		function validateLogin() {
				const fieldErrorsName = {};
				let validationFlag = true;
				if (email.trim() === "") {
						fieldErrorsName["email"] = "Please enter a email";
						validationFlag = false;
				}
				if (password.trim() === "") {
						fieldErrorsName["password"] = "Please enter a password";
						validationFlag = false;
				}
				if (email.trim() !== "" && !validateEmail(email)) {
						fieldErrorsName["email"] = "Please enter a valid email";
						validationFlag = false;
				}
				setErrorFieldName(fieldErrorsName);
				setErrorFlag(!errorFlag);
				return validationFlag;
		}

		function loginRequest() {
				if (validateLogin()) {
						const login_model = new LoginModel(email, password);
						const authRequest = new AuthRequests();
						authRequest.login(login_model).then(value => {
								if (value instanceof LoginResponseModel) {
										adminContextDispatcher({
											type: "set_admin_data",
											model: value.data
										});
										localStorage.setItem("admin_data", JSON.stringify(value.data));
										localStorage.setItem("user_role", value.data.type);
										localStorage.setItem("web_session_active", "true");
										window.location.href = routes.index;
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
																						<h5 className="text-primary text-center">E-Commerce Admin Portal: Login</h5>
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
																				<label htmlFor="email">Email</label>
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
																				<label htmlFor="userpassword">Password</label>
																				<input
																						type="password"
																						className="form-control"
																						id="userpassword"
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

																		<div className="mt-3">
																				<button
																						className="btn btn-primary btn-block waves-effect waves-light"
																						type="button"
																						onClick={() => loginRequest()}
																				>
																						Log In
																				</button>
																		</div>
																</div>
														</div>
												</div>
												<FooterComponent>
														<p><Link to={"/admin/register"} className="font-weight-medium text-primary">Don't have an account ? Register</Link>
														</p>
												</FooterComponent>
										</div>
								</div>
						</div>
				</div>
		);

}
