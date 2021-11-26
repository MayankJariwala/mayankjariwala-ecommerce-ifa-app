import HttpRequestMapper from "src/network/HttpRequestMapper";
import {Logging} from "src/loggers/logging";
import {Ep_auth} from "src/network/endpoints/Auth";
import {LoginModel} from "src/network/model/request/LoginModel";
import {LoginResponseModel, RegisterResponseModel} from "src/network/model/responses/AuthResponseModel";
import {STATUS_CODES} from "src/network/HttpReferenceList";
import {ExceptionResponse, NetworkExceptionResponse} from "src/network/model/Response";
import {AdminRegisterModel} from "src/network/model/request/RegisterModel";
import {AdminRegisterResponseModel} from "src/network/model/responses/AuthResponseModel";

const LAYER_NAME = "AuthRequests";

/**
 * AuthRequests: requests related to authentication
 * @author Mayank Jariwala
 */
export class AuthRequests {

	httpRequestMapper: HttpRequestMapper;

	constructor() {
		this.httpRequestMapper = new HttpRequestMapper();
	}

	login = async (login_model: LoginModel) => {
		try {
			Logging.log(LAYER_NAME, `Login Request object: ${JSON.stringify(login_model)}`);
			const response = await this.httpRequestMapper.RNPostRequest(
				{},
				JSON.stringify(login_model),
				Ep_auth._login()
			);
			Logging.log(LAYER_NAME, `Login response: ${JSON.stringify(response)}`);
			if (response.status === STATUS_CODES.OK) {
				return new LoginResponseModel(200, "Admin Information", response.data);
			} else {
				return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
			}
		} catch (e) {
			Logging.log(LAYER_NAME, `Login user exception: ${e.toString()}`);
			return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
		}
	};

	register = async (headers: any, model: AdminRegisterModel) => {
		try {
			Logging.log(LAYER_NAME, `Registration Request object: ${JSON.stringify(model)}`);
			const response = await this.httpRequestMapper.RNPostRequest(
				headers,
				JSON.stringify(model),
				Ep_auth._register()
			);
			Logging.log(LAYER_NAME, `Registration response: ${JSON.stringify(response)}`);
			if (response.status === STATUS_CODES.OK) {
				return new RegisterResponseModel(response.data.status, response.data.message);
			} else {
				return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
			}
		} catch (e) {
			Logging.log(LAYER_NAME, `Registration exception: ${e.toString()}`);
			return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
		}
	};
}
