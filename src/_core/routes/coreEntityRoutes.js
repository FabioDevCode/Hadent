import express from "express";
const router = express.Router();
import coreEntityController from "../controllers/coreEntityController.js";
import wrapAsync from "../utils/wrapAsync.js";

router.get("/list", wrapAsync(coreEntityController.list));
router.get("/datalist", wrapAsync(coreEntityController.datalist));
router.get("/show/:id", wrapAsync(coreEntityController.show));
router.get("/createForm", wrapAsync(coreEntityController.createForm));
router.post("/create", wrapAsync(coreEntityController.create));
router.get("/updateForm/:id", wrapAsync(coreEntityController.updateForm));
router.post("/update/:id", wrapAsync(coreEntityController.update));
router.post("/delete/:id", wrapAsync(coreEntityController.delete));

export default router;
