const PREFIX = "/admin";

const routes = {
		defaultHash: "/#",
		indexSlash: "/",
		index: PREFIX,
		auth: {
				login: `${PREFIX}/login`,
				reset_password: `${PREFIX}/reset-password`
		},
		products: {
				create: `${PREFIX}/products/create`,
				list: `${PREFIX}/products`
		},
		category: {
				create: `${PREFIX}/category`,
				list: `${PREFIX}/categories`
		}

};

module.exports = routes;
