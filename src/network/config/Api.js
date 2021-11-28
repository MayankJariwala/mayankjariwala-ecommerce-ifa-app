import type {IApiConfig} from "./IApiConfig";
import ApiConfig from "./ApiConfig";

export class Api {
		config: IApiConfig;

		constructor() {
				this.config = new ApiConfig();
		}
}
