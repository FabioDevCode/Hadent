import express from "express";
const router = express.Router();
import * as dctl from "../controllers/default.controllers.js";


router.get("/", dctl.index);
router.get("/login", dctl.login);
router.get("/home", dctl.home);

export default router;