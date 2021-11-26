import {Response} from "src/network/model/Response";

interface Category {
	_id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export class CategoriesListResponse extends Response {
	data: Category[];

	constructor(status: string, message: string, data: Category[], description: string = "") {
		super(status, message, description);
		this.data = data;
	}

}

export class CategoryCreateResponse extends Response {
	constructor(status: string, message: string, data: any, description = "") {
		super(status, message, description);
	}
}

export class CategoryDeleteResponse extends Response {
		constructor(status: string, message: string) {
				super(status, message, "");
		}
}
