import express from "express";
const router = express.Router();
import * as ctl from "../controllers/default.controllers.js";

router.get("/", ctl.index);
router.get("/login", ctl.login);

// CONNECTION ACCESS =========================== //
router.get("/home", ctl.home);

// first_login
// login

export default router;
