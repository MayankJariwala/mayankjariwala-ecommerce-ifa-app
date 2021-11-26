import HttpRequestMapper from "src/network/HttpRequestMapper";
import {Logging} from "src/loggers/logging";
import {Ep_category} from "src/network/endpoints/Category";
import {STATUS_CODES} from "src/network/HttpReferenceList";
import {ExceptionResponse, NetworkExceptionResponse, UnauthorizedExceptionResponse} from "src/network/model/Response";
import {
		CategoriesListResponse,
		CategoryCreateResponse,
		CategoryDeleteResponse
} from "src/network/model/responses/CategoryResponseModel";

const LAYER_NAME = "CategoriesRequests";

/**
 * CategoriesRequests: requests related to categories
 * @author Mayank Jariwala
 */
export class CategoriesRequests {

		httpRequestMapper: HttpRequestMapper;

		constructor() {
				this.httpRequestMapper = new HttpRequestMapper();
		}

		create = async (headers: any, category_model: any) => {
				try {
						Logging.log(LAYER_NAME, `Creating category with model ${JSON.stringify(category_model)}`);
						const response = await this.httpRequestMapper.RNPostRequest(
								headers,
								JSON.stringify(category_model),
								Ep_category._create()
						);
						Logging.log(LAYER_NAME, `Category Create response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new CategoryCreateResponse(response.data.status, response.data.message, response.data.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Category create exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		update = async (headers: any, category_model: any, id: string) => {
				try {
						Logging.log(LAYER_NAME, `updating category with model ${JSON.stringify(category_model)}`);
						const response = await this.httpRequestMapper.RNPatchRequest(
								headers,
								JSON.stringify(category_model),
								Ep_category._update(id)
						);
						Logging.log(LAYER_NAME, `Category Update response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new CategoryCreateResponse(response.data.status, response.data.message, response.data.data);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Category update exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		delete = async (headers: any, category_id: string) => {
				try {
						Logging.log(LAYER_NAME, `Deleting category`);
						const response = await this.httpRequestMapper.RNDeleteRequest(
								headers,
								Ep_category._delete(category_id)
						);
						Logging.log(LAYER_NAME, `Category delete response: ${response.status}`);
						console.log(response.status);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new CategoryDeleteResponse(response.data.status, response.data.message);
								case STATUS_CODES.UNAUTHORIZED:
										return new UnauthorizedExceptionResponse(response.data.status, response.data.message, response.data.data);
								default:
										return new ExceptionResponse(response.data.status, response.data.message, response.data.stack, response.data.exception);
						}
				} catch (e) {
						Logging.log(LAYER_NAME, `Category delete exception: ${e.toString()}`);
						return new NetworkExceptionResponse(500, "Something went wrong", e.toString(), "Network Exception");
				}
		};

		fetchAll = async (headers: any) => {
				try {
						Logging.log(LAYER_NAME, `Fetching all categories`);
						const response = await this.httpRequestMapper.RNGetRequest(
								headers,
								Ep_category._fetchAll()
						);
						Logging.log(LAYER_NAME, `Categories List response: ${response.status}`);
						switch (response.status) {
								case STATUS_CODES.OK:
										return new CategoriesListResponse(200, "Product Categories", response.data);
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
