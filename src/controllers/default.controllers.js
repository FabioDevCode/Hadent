export const index = (req, res) => {
	res.render("index", {
		layout: false,
	});
};

export const login = (req, res) => {
	res.render("login", {
		layout: "login",
	});
};

export const home = (req, res) => {
	res.render("home");
};
