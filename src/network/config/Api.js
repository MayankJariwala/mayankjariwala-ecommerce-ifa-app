import ApiDevConfig from "./ApiDevConfig";
import type {IApiConfig} from "./IApiConfig";
import {DEVELOPMENT_MODE} from "src/constants/values";
import ApiProdConfig from "./ApiProdConfig";

export class Api {
	config: IApiConfig;

	constructor() {
		if (`${process.env.NODE_ENV}` === DEVELOPMENT_MODE) {
			this.config = new ApiDevConfig();
		} else {
			this.config = new ApiProdConfig();
		}
	}
}
