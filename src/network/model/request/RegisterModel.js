export class RegisterModel {
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		mobile: string;
		type: string;

		constructor(
				first_name: string,
				last_name: string,
				email: string,
				username: string,
				password: string,
				mobile: string,
				type: string,
		) {
				this.first_name = first_name;
				this.last_name = last_name;
				this.email = email;
				this.username = username;
				this.password = password;
				this.mobile = mobile;
				this.type = type;
		}
}
