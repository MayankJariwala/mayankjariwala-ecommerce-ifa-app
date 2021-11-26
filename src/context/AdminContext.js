import React from "react";

/**
 * Auth Admin Login Model
 * @author Mayank Jariwala
 */

class AdminUserModel {
	_id: string;
	name: string;
	email: string;
	session_token: string;
	uuid: string;
	createdAt: string;
	updatedAt: string;
}

const initialState = {
	admin_model: localStorage.getItem("admin_data") !== undefined ? JSON.parse(localStorage.getItem("admin_data")) : new AdminUserModel(),
	web_session_active: false
};

const AdminSessionContext = React.createContext(initialState);
const {Provider} = AdminSessionContext;

const adminContextReducer = (state, action) => {
	switch (action.type) {
		case "set_admin_data":
			return {
				...state,
				admin_model: action.model,
				web_session_active: true
			};
		case "logout":
			const new_state = {
				...state,
				admin_model: new AdminUserModel(),
				web_session_active: false
			};
			localStorage.removeItem("web_session_active");
			localStorage.removeItem("admin_data");
			return new_state;
		default:
			throw new Error();
	}
};

const AdminContextProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(adminContextReducer, initialState);
	return (
		<Provider value={{
			adminContextState: state,
			adminContextDispatcher: dispatch
		}}>
			{children}
		</Provider>
	);
};

export {AdminContextProvider, AdminSessionContext};
