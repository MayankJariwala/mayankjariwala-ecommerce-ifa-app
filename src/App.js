import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import {AdminSessionContext} from "src/context/AdminContext";
import routes from "src/constants/routes";
import {Redirect} from "react-router";
import {IndexPage} from "src/pages/IndexPage";
import {CategoryComponent} from "src/components/products_category/CategoryComponent";
import {ProductComponent} from "src/components/products/ProductComponent";
import {ViewCategoriesComponent} from "src/components/products_category/ViewCategoriesComponent";
import {ViewProductsComponent} from "src/components/products/ViewProductsComponent";
import {LoginComponent} from "src/components/auth/LoginComponent";

function App() {

		console.disableYellowBox = true;

		const [redirectToLogin, setRedirectToLogin] = React.useState(false);
		// const adminContext = React.useContext(AdminSessionContext);
		// const {adminContextDispatcher} = adminContext;

		return (
				<Router>
						<Switch>
								<Route exact={true} path={routes.auth.login} component={LoginComponent}/>
								<Route exact={true} path={routes.indexSlash} component={() => (
										redirectToLogin !== undefined && redirectToLogin ?
												<Redirect to={routes.auth.login} push={false}/> :
												<IndexPage/>
								)}/>
								<Route exact={true} path={routes.category.create} component={() => (
										redirectToLogin !== undefined && redirectToLogin ?
												<Redirect to={routes.auth.login} push={false}/> :
												<CategoryComponent/>
								)}/>
								<Route exact={true} path={routes.category.list} component={() => (
										redirectToLogin !== undefined && redirectToLogin ?
												<Redirect to={routes.auth.login} push={false}/> :
												<ViewCategoriesComponent/>
								)}/>
								<Route exact={true} path={routes.products.create} component={() => (
										redirectToLogin !== undefined && redirectToLogin ?
												<Redirect to={routes.auth.login} push={false}/> :
												<ProductComponent/>
								)}/>
								<Route exact={true} path={routes.products.list} component={() => (
										redirectToLogin !== undefined && redirectToLogin ?
												<Redirect to={routes.auth.login} push={false}/> :
												<ViewProductsComponent/>
								)}/>
						</Switch>
				</Router>
		);
}

export default App;
