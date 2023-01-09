import { Router } from "express";

//---------------------- Imports ----------------------
//Deliveryman
import { ensureAuthenticateDeliveryman } from "./deliveryman/middlewares/ensureAuthenticateDeliveryman";
import { CreateDeliverymanController } from "./deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CompleteDeliveryByDeliverymanController } from "./deliveryman/useCases/completeDeliveryByDeliveryman/CompleteDeliveryByDeliverymanController";

//Clients
import { ensureAuthenticateClient } from "./clients/middlewares/ensureAuthenticateClient";
import { CreateClienteController } from "./clients/useCases/createCliente/CreateClientController";
import { AuthenticatorClientController } from "./clients/useCases/authenticateClient/AuthenticateClientController";
import { GetAllClientDeliveriesController } from "./clients/useCases/getAllClientDeliveries/GetAllClientDeliveriesController";

//Deliveries
import { CreateDeliveryController } from "./deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./deliveries/useCases/findAllWithoutEndDate/FindAllWithoutEndDateController";
import { SubmitDeliverymanToDeliverController } from "./deliveries/useCases/submitDeliverymanToDeliver/SubmitDeliverymanToDeliverController";
import { GetAllDeliverymanDeliveriesController } from "./deliveryman/useCases/getAllDeliverymanDeliveries/GetAllDeliverymanDeliveriesController";

//---------------------- Instances ----------------------
//Deliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const getAllDeliverymanDeliveriesController =
  new GetAllDeliverymanDeliveriesController();
const completeDeliveryByDeliverymanController =
  new CompleteDeliveryByDeliverymanController();

//Clients
const createClienteController = new CreateClienteController();
const authenticatorClientController = new AuthenticatorClientController();
const getAllClientDeliveriesController = new GetAllClientDeliveriesController();

//Deliveries
const createDeliveryController = new CreateDeliveryController();
const findAllWithoutEndDateController = new FindAllWithoutEndDateController();
const submitDeliverymanToDeliverController =
  new SubmitDeliverymanToDeliverController();

//---------------------- Routes ----------------------
const routes = Router();
//Deliveryman
routes.post("/deliveryman/create", createDeliverymanController.handle);
routes.post("/deliveryman/login", authenticateDeliverymanController.handle);
routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  getAllDeliverymanDeliveriesController.handle
);
routes.post(
  "/deliveryman/deliveries/complete/:id",
  ensureAuthenticateDeliveryman,
  completeDeliveryByDeliverymanController.handle
);

//Client
routes.post("/client/create", createClienteController.handle);
routes.post("/client/login", authenticatorClientController.handle);
routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  getAllClientDeliveriesController.handle
);

//Deliveries
routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);
routes.get(
  "/deliveries/available",
  ensureAuthenticateDeliveryman,
  findAllWithoutEndDateController.handle
);
routes.post(
  "/deliveries/submitDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  submitDeliverymanToDeliverController.handle
);

export { routes };
