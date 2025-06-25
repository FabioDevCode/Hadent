import express from "express";
const router = express.Router();
import * as ctl from "../controllers/module.controllers.js";

router.get("/administration", ctl.administration);



export default router;
