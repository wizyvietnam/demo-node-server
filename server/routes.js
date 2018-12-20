import { Router } from "express";

import { indexController } from "./controllers/indexController";

const routes = new Router();

routes.get("/result", indexController.getIndex);

export default routes;
