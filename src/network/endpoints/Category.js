import {Api} from "src/network/config/Api";

class Category extends Api {

	CURRENT_VERSION = "v1";
	SERVICE_NAME = "categories";

	_fetchAll() {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}`;
	}

	_update(id) {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}/${id}`;
	}

	_create() {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}`;
	}

	_delete(category_id: string) {
		return `${this.config.base.index}/${this.CURRENT_VERSION}/${this.SERVICE_NAME}/${category_id}`;
	}

}

export const Ep_category = new Category();
