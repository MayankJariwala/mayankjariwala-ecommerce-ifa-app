import {Response} from "src/network/model/Response";

interface Products {
		_id: string;
		name: string;
		description: string;
		sku: string;
		price: number;
		quantity: number;
		createdAt: string;
		updatedAt: string;
}

export class ProductsListResponse extends Response {
		data: Products[];

		constructor(status: string, message: string, data: Products[], description: string = "") {
				super(status, message, description);
				this.data = data;
		}

}

export class ProductsCreateResponse extends Response {
		constructor(status: string, message: string, data: any, description = "") {
				super(status, message, description);
		}
}

export class ProductsDeleteResponse extends Response {
		constructor(status: string, message: string) {
				super(status, message, "");
		}
}
