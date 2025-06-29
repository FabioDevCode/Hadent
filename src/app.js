import * as path from "node:path";
import consoleStamp from "console-stamp";
import cookieParser from "cookie-parser";
import cors from "cors";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import express from "express";
import helmet from "helmet";
import i18n from "i18n";
import morgan from "morgan";
import split from "split";

import helmet_config from "../src/config/helmet.js";
import errorHandler from "./_core/middlewares/errorHandler.js";
import routes from "./routes/index.js";

dayjs.extend(utc);
dayjs.extend(timezone);

import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

i18n.configure({
	locales: ["fr"],
	defaultLocale: "fr",
	directory: `${__dirname}/locales`,
	cookie: "lang",
	queryParameter: "lang",
	autoReload: true,
	objectNotation: true,
});

const morgan_config = {
	skip: (req) => {
		if (
			req.url === "/" ||
			req.url.includes("/css") ||
			req.url.includes("/img") ||
			req.url.includes("/js") ||
			req.url.includes("/plugins") ||
			req.url.includes("/favicon.ico")
		) {
			return true;
		}
	},
	stream: split().on("data", (line) => {
		process.stdout.write(`[${dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss-SSS")}] ${line} \n`);
	}),
};

app.use(morgan("dev", morgan_config));

consoleStamp(console, {
	formatter: () => dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss-SSS"),
	label: false,
	datePrefix: "",
	dateSuffix: "",
});

import models from "./models/index.js";

await models.sequelize
	.sync()
	.then(() => {
		console.log("Database & tables updated !");
	})
	.catch((err) => {
		console.error("Error sync database:", err);
	});

import { sanitizeBody } from "./utils/security.js";

app.use((req, res, next) => {
	if (req.body) {
		req.body = sanitizeBody(req.body);
	}
	if (req.query) {
		req.query = sanitizeBody(req.query);
	}
	if (req.params) {
		req.params = sanitizeBody(req.params);
	}
	next();
});

app.disable("x-powered-by");
app.use(helmet(helmet_config));
app.use(cors());
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import MySQLStoreConstructor from "express-mysql-session";
import session from "express-session";
import database from "./config/database.js";
const MySQLStore = MySQLStoreConstructor(session);

const sessionStore = new MySQLStore(database);

app.use(
	session({
		name: "hadent",
		secret: "example_secret",
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production", // true if https (HTTPS requis)
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 jour
			sameSite: "lax",
		},
		rolling: false,
		unset: "destroy",
	}),
);

import { create } from "express-handlebars";
import hbs_fn from "./helpers/hbs_fn.js";

const hbs = create({
	defaultLayout: "main",
	layoutsDir: `${__dirname}/views/layouts`,
	partialsDir: `${__dirname}/views/partials`,
	extname: ".hbs",
	helpers: hbs_fn,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", [`${__dirname}/views/pages`]);
app.use("/public", express.static(path.join(__dirname, "public")));

await routes(app);
app.use(errorHandler);

export default app;
