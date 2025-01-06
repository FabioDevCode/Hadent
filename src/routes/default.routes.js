import express from "express";
const router = express.Router();
import * as dctl from "../controllers/default.controllers.js";

router.get("/", dctl.index);

export default router;