import { Router } from "express";

import { ensureAuthenticateDeliverymanMiddleware } from "./middlewares/ensureAuthenticateDeliverymanMiddleware";
import { CreateDeliverymanController } from "./useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CompleteDeliveryByDeliverymanController } from "./useCases/completeDeliveryByDeliveryman/CompleteDeliveryByDeliverymanController";
import { GetAllDeliverymanDeliveriesController } from "./useCases/getAllDeliverymanDeliveries/GetAllDeliverymanDeliveriesController";

const routesDeliveryman = Router();

const createDeliverymanController =
    new CreateDeliverymanController();
const authenticateDeliverymanController =
    new AuthenticateDeliverymanController();
const getAllDeliverymanDeliveriesController =
    new GetAllDeliverymanDeliveriesController();
const completeDeliveryByDeliverymanController =
    new CompleteDeliveryByDeliverymanController();

routesDeliveryman.post(
    "/deliveryman/create",
    createDeliverymanController.handle
);
routesDeliveryman.post("/deliveryman/login",
    authenticateDeliverymanController.handle
);
routesDeliveryman.get(
    "/deliveryman/deliveries",
    ensureAuthenticateDeliverymanMiddleware,
    getAllDeliverymanDeliveriesController.handle
);
routesDeliveryman.post(
    "/deliveryman/deliveries/complete/:id",
    ensureAuthenticateDeliverymanMiddleware,
    completeDeliveryByDeliverymanController.handle
);

export { routesDeliveryman };