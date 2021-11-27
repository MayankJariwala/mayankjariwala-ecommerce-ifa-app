import {Response} from "src/network/model/Response";

interface Login {
		_id: string;
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		mobile: string;
		type: string;
		accountId: string;
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
