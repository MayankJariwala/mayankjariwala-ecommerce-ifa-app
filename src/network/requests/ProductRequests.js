import HttpRequestMapper from "src/network/HttpRequestMapper";
import {Logging} from "src/loggers/logging";
import {STATUS_CODES} from "src/network/HttpReferenceList";
import {ExceptionResponse, NetworkExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import {
		ProductsCreateResponse,
		ProductsDeleteResponse,
		ProductsListResponse
} from "src/network/model/responses/ProductResponseModel";
import {Ep_product} from "src/network/endpoints/Product";

const LAYER_NAME = "ProductRequests";

export class ProductRequests {

		httpRequestMapper: HttpRequestMapper;

		constructor() {
				this.httpRequestMapper = new HttpRequestMapper();
		}

		create = async (headers: any, product_model: any) => {
				try {
						Logging.log(LAYER_NAME, `Creating product with model ${JSON.stringify(product_model)}`);
						const response = await this.httpRequestMapper.RNPostRequest(
								headers,
								JSON.stringify(product_model),
								Ep_product._create()
						);
						Logging.log(LAYER_NAME, `product create response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new ProductsCreateResponse(response.data.status, response.data.message, response.data.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `product create exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		update = async (headers: any, product_model: any, id: string) => {
				try {
						Logging.log(LAYER_NAME, `updating product with model ${JSON.stringify(product_model)}`);
						const response = await this.httpRequestMapper.RNPutRequest(
								headers,
								JSON.stringify(product_model),
								Ep_product._update(id)
						);
						Logging.log(LAYER_NAME, `product update response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new ProductsCreateResponse(response.data.status, response.data.message, response.data.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `product update exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		delete = async (headers: any, product_id: string) => {
				try {
						Logging.log(LAYER_NAME, `Deleting product`);
						const response = await this.httpRequestMapper.RNDeleteRequest(
								headers,
								Ep_product._delete(product_id)
						);
						Logging.log(LAYER_NAME, `product delete response: ${response.status}`);
						console.log(response.status);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new ProductsDeleteResponse(response.data.status, response.data.message);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `product delete exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		fetchAll = async (headers: any) => {
				try {
						Logging.log(LAYER_NAME, `Fetching all categories`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_product._fetchAll()
						);
						Logging.log(LAYER_NAME, `Categories List response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new ProductsListResponse(200, "Products", response.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Login user exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

}
