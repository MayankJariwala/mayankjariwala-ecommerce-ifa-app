import HttpRequestMapper from "src/network/HttpRequestMapper";
import {Logging} from "src/loggers/logging";
import {STATUS_CODES} from "src/network/HttpReferenceList";
import {ExceptionResponse, NetworkExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import {Ep_order} from "src/network/endpoints/Order";
import {OrderListResponse, SingleOrderResponse} from "src/network/model/responses/OrderResponseModel";

const LAYER_NAME = "OrderRequests";

export class OrderRequests {

		httpRequestMapper: HttpRequestMapper;

		constructor() {
				this.httpRequestMapper = new HttpRequestMapper();
		}

		fetchAll = async (headers: any) => {
				try {
						Logging.log(LAYER_NAME, `Fetching orders by id`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_order._fetchAll()
						);
						Logging.log(LAYER_NAME, `Orders response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new OrderListResponse(200, "Orders", response.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Orders  exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		fetchById = async (headers: any, id: string) => {
				try {
						Logging.log(LAYER_NAME, `Fetching orders by id`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_order._fetch_by_id(id)
						);
						Logging.log(LAYER_NAME, `Orders by id response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new SingleOrderResponse(200, "Orders", response.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Orders by id exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

}
