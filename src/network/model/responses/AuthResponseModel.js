import {Response} from "src/network/model/Response";

interface Login {
	is_approved: boolean;
	_id: string;
	name: string;
	email: string;
	session_token: string;
	updated_at: string;
	created_at: string;
	updatedAt: string;
}

export class LoginResponseModel extends Response {
	data: Login;

	constructor(status: string, message: string, data: Login, description: string = "") {
		super(status, message, description);
		this.data = data;
	}

	setData(data: Login) {
		this.data = data;
	}
}


export class RegisterResponseModel extends Response {

	constructor(status: string, message: string, description: string = "") {
		super(status, message, description);
	}
}
