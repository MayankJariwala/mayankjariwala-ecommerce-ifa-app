const PREFIX = "/admin";

const routes = {
		defaultHash: "/#",
		indexSlash: "/",
		index: PREFIX,
		auth: {
				login: `${PREFIX}/login`,
				register: `${PREFIX}/register`,
				reset_password: `${PREFIX}/reset-password`
		},
		products: {
				create: `${PREFIX}/products/create`,
				list: `${PREFIX}/products`
		},
		category: {
				create: `${PREFIX}/category`,
				list: `${PREFIX}/categories`
		},
		users: {
				list: `${PREFIX}/users`
		}
};

module.exports = routes;
