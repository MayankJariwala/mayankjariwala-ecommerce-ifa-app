import {Api} from "src/network/config/Api";

class Auth extends Api {

	CURRENT_VERSION = "v1";
	SERVICE_NAME = "auth";

	_login() {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}/login`;
	}

	_register() {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}/register`;
	}

}

export const Ep_auth = new Auth();
