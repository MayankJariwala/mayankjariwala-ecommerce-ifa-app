import {Api} from "src/network/config/Api";

class Order extends Api {

		CURRENT_VERSION = "v1";
		SERVICE_NAME = "orders";

		_fetchAll() {
				return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}`;
		}

		_fetch_by_id(id) {
				return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}/${id}`;
		}


}

export const Ep_order = new Order();
