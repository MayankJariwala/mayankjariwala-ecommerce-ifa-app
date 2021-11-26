import type {IApiConfig} from "./IApiConfig";
import {DEVELOPMENT_MODE} from "src/constants/values";

class ApiDevConfig implements IApiConfig {
	constructor() {
		this.environment = DEVELOPMENT_MODE;
		this.base = {
			index: `${process.env.REACT_APP_SERVER_BASE_URI}:${process.env.REACT_APP_SERVER_PORT}`
		};
	}
}

export default ApiDevConfig;
