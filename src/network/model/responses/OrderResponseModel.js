import {Response} from "src/network/model/Response";

interface OrderItem {
		order_id: string;
		product_id: string;
		quantity: number;
		price: number;
}

interface Orders {
		_id: string;
		reference_number: string;
		user_id: string;
		total: string;
		items: OrderItem[];
		createdAt: string;
		updatedAt: string;
}

export class OrderListResponse extends Response {
		data: Orders[];

		constructor(status: string, message: string, data: Orders[], description: string = "") {
				super(status, message, description);
				this.data = data;
		}

}

export class SingleOrderResponse extends Response {
		data: Orders;

		constructor(status: string, message: string, data: Orders, description: string = "") {
				super(status, message, description);
				this.data = data;
		}

}
