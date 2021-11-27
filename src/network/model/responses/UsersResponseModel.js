import {Response} from "src/network/model/Response";


interface Users {
		"_id": string;
		"first_name": string;
		"last_name": string;
		"email": string;
		"username": string;
		"mobile": string;
		"type": string;
		"accountId": string;
		"createdAt": string;
		"updatedAt": string;
}

export class UsersListResponse extends Response {
		data: Users[];

		constructor(status: string, message: string, data: Users[], description: string = "") {
				super(status, message, description);
				this.data = data;
		}

}

export class SingleUserResponse extends Response {
		data: Users;

		constructor(status: string, message: string, data: Users, description: string = "") {
				super(status, message, description);
				this.data = data;
		}

}
