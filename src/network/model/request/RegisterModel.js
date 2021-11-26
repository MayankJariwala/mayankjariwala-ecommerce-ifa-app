export class RegisterModel {
	name: string;
	email: string;
	session_token: string = "";
	password: string;
	is_approved: boolean;

	constructor(name: string, email: string, password: string, is_approved: boolean) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.is_approved = is_approved;
	}
}
