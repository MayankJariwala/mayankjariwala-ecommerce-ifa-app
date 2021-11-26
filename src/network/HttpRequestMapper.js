import {Logging} from "src/loggers/logging";
import axios from "axios";

const layerName = "HTTP_REQUEST_MAPPER";

export default class HttpRequestMapper {
	constructor() {
	}

	RNPostRequest = async (headers = {}, body, url) => {
		try {
			const final_headers = {
				"Content-Type": "application/json",
				Accept: "application/json",
				...headers
			};
			return await axios.post(url, body, {
				headers: final_headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNPatchRequest = async (headers = {}, body, url) => {
		try {
			const final_headers = {
				"Content-Type": "application/json",
				Accept: "application/json",
				...headers
			};
			return await axios.patch(url, body, {
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				},
				headers: final_headers
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNGetRequest = async (headers = {}, url = "") => {
		try {
			const final_headers = {
				"Content-Type": "application/json",
				Accept: "application/json",
				...headers
			};
			return await axios.get(url, {
				headers: final_headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNHeadRequest = async (headers = {}, url = "") => {
		try {
			return await axios.head(url, {
				headers: headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNPutRequest = async (headers = {}, body = {}, url = "") => {
		try {
			const final_headers = {
				"Content-Type": "application/json",
				Accept: "application/json",
				...headers
			};
			return await axios.put(url, body, {
				headers: final_headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNDeleteRequest = async (headers = {}, url = "") => {
		try {
			const final_headers = {
				"Content-Type": "application/json",
				Accept: "application/json",
				...headers
			};
			return await axios.delete(url, {
				headers: final_headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};

	RNFileUploadRequest = async (headers = {}, body, url) => {
		try {
			const final_headers = {
				"Accept": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
				...headers
			};
			return await axios.post(url, body, {
				headers: final_headers,
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			});
		} catch (e) {
			Logging.debug(layerName, e.toString());
			throw e;
		}
	};
}
