import HttpRequestMapper from "src/network/HttpRequestMapper";
import {Logging} from "src/loggers/logging";
import {STATUS_CODES} from "src/network/HttpReferenceList";
import {ExceptionResponse, NetworkExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import {Ep_users} from "src/network/endpoints/Users";
import {SingleUserResponse, UsersListResponse} from "src/network/model/responses/UsersResponseModel";

const LAYER_NAME = "UserRequests";

export class UserRequests {

		httpRequestMapper: HttpRequestMapper;

		constructor() {
				this.httpRequestMapper = new HttpRequestMapper();
		}

		fetchAll = async (headers: any) => {
				try {
						Logging.log(LAYER_NAME, `Fetching users`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_users._fetchAll()
						);
						Logging.log(LAYER_NAME, `Users response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new UsersListResponse(200, "Users", response.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Users exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		fetchById = async (headers: any, id: string) => {
				try {
						Logging.log(LAYER_NAME, `Fetching users by id`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_users._fetch_by_id(id)
						);
						Logging.log(LAYER_NAME, `Users by id response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new SingleUserResponse(200, "Orders", response.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Users by id exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

}
