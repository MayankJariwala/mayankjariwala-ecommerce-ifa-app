import type {IApiConfig} from "./IApiConfig";
import {PRODUCTION_MODE} from "src/constants/values";


class ApiProdConfig implements IApiConfig {
	constructor() {
		this.environment = PRODUCTION_MODE;
		this.base = {
			index: `${process.env.REACT_APP_SERVER_BASE_URI}`
		};
	}
}

export default ApiProdConfig;
