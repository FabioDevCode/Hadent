import express from "express";
const router = express.Router();
import * as ctl from "../controllers/module.controllers.js";

// import wrapAsync from '../_core/utils/wrapAsync.js';
// import coreEntityController from "../_core/controllers/coreEntityController.js";

// router.get('/list', wrapAsync(coreEntityController.list));
// router.get('/datalist', wrapAsync(coreEntityController.datalist));
// router.get('/show/:id', wrapAsync(coreEntityController.show));
// router.get('/createForm', wrapAsync(coreEntityController.createForm));
// router.post('/create', wrapAsync(coreEntityController.create));
// router.get('/updateForm/:id', wrapAsync(coreEntityController.updateForm));
// router.post('/update/:id', wrapAsync(coreEntityController.update));
// router.post('/delete/:id', wrapAsync(coreEntityController.delete));


router.get("/main", ctl.main);
router.get("/administration", ctl.administration);


export default router;
