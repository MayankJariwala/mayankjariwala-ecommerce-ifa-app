import React from "react";
import {Link} from "react-router-dom";
import routes from "src/constants/routes";
import "src/assets/css/custom/navigation.css";
import {AdminSessionContext} from "src/context/AdminContext";

export function NavigationComponent() {

		const adminContext = React.useContext(AdminSessionContext);
		const {adminContextDispatcher} = adminContext;

		const logout = _ => {
				adminContextDispatcher({
						type: "logout"
				});
				localStorage.removeItem("admin_data");
				localStorage.removeItem("web_session_active");
				localStorage.removeItem("user_role");
				window.location = routes.auth.login;
		};

		return (
				<div id="layout-wrapper">
						<header id="page-topbar" className={"bg-dark"}>
								<div className="navbar-header">
										<div className="d-flex">
												<a href={routes.index}>
														<h4 className={"text-white"}>E-Commerce Portal</h4>
												</a>
										</div>
										<div className="dropdown d-inline-block">
												<a className="dropdown-item text-danger" onClick={() => logout()} href="/#">
														<i className="mdi mdi-logout font-size-16 align-middle mr-1 text-danger"/>
														Logout
												</a>
										</div>
								</div>
						</header>
						<div className="topnav">
								<div className="container-fluid">
										<nav className="navbar navbar-light navbar-expand-lg topnav-menu">
												<div className="collapse navbar-collapse" id="topnav-menu-content">
														<ul className="navbar-nav">
																<li className="nav-item nav-link">
																		<Link to={routes.index} className={"nav-color"}>
																				<span key="t-dashboards">Dashboard</span>
																		</Link>
																</li>
																<li className="nav-item nav-link">
																		<Link to={routes.users.list} className={"nav-color"}>
																				<span key="t-dashboards">Users</span>
																		</Link>
																</li>
																<li className="nav-item dropdown">
																		<a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components"
																		   role="button"
																		   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																				<span
																						key="t-components">Products</span>
																				<div className="arrow-down"/>
																		</a>
																		<div className="dropdown-menu" aria-labelledby="topnav-components">
																				<div className="dropdown">
																						<a className="dropdown-item dropdown-toggle arrow-none"
																						   href={routes.products.create}
																						   id="topnav-form"
																						   role="button" aria-haspopup="true"
																						   aria-expanded="false">
																								<span key="t-forms">Create</span>
																						</a>
																						<a className="dropdown-item dropdown-toggle arrow-none"
																						   href={routes.products.list}
																						   id="topnav-form"
																						   role="button" aria-haspopup="true"
																						   aria-expanded="false">
																								<span key="t-forms">List</span>
																						</a>
																				</div>
																		</div>
																</li>
																<li className="nav-item dropdown">
																		<a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components"
																		   role="button"
																		   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																				<span
																						key="t-components">Categories</span>
																				<div className="arrow-down"/>
																		</a>
																		<div className="dropdown-menu" aria-labelledby="topnav-components">
																				<div className="dropdown">
																						<a className="dropdown-item dropdown-toggle arrow-none"
																						   href={routes.category.create}
																						   id="topnav-form"
																						   role="button" aria-haspopup="true"
																						   aria-expanded="false">
																								<span key="t-forms">Create</span>
																						</a>
																						<a className="dropdown-item dropdown-toggle arrow-none"
																						   href={routes.category.list}
																						   id="topnav-form"
																						   role="button" aria-haspopup="true"
																						   aria-expanded="false">
																								<span key="t-forms">List</span>
																						</a>
																				</div>
																		</div>
																</li>
														</ul>
												</div>
										</nav>
								</div>
						</div>
				</div>
		);
}
