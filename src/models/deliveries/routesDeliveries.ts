import { Router } from "express";


import { CreateDeliveryController } from "./useCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./useCases/findAllWithoutEndDate/FindAllWithoutEndDateController";
import { SubmitDeliverymanToDeliverController } from "./useCases/submitDeliverymanToDeliver/SubmitDeliverymanToDeliverController";

import { ensureAuthenticateClientMiddleware } from "../clients/middlewares/ensureAuthenticateClientMiddleware";
import { ensureAuthenticateDeliverymanMiddleware } from "../deliveryman/middlewares/ensureAuthenticateDeliverymanMiddleware";

const createDeliveryController =
    new CreateDeliveryController();
const findAllWithoutEndDateController =
    new FindAllWithoutEndDateController();
const submitDeliverymanToDeliverController =
    new SubmitDeliverymanToDeliverController();

const routesDeliveries = Router();

routesDeliveries.post(
    "/delivery",
    ensureAuthenticateClientMiddleware,
    createDeliveryController.handle
);
routesDeliveries.get(
    "/deliveries/available",
    ensureAuthenticateDeliverymanMiddleware,
    findAllWithoutEndDateController.handle
);
routesDeliveries.post(
    "/deliveries/submitDeliveryman/:id",
    ensureAuthenticateDeliverymanMiddleware,
    submitDeliverymanToDeliverController.handle
);

export { routesDeliveries }