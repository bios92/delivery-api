import { Router } from "express";


import { ensureAuthenticateClientMiddleware } from "./middlewares/ensureAuthenticateClientMiddleware";
import { CreateClienteController } from "./useCases/createCliente/CreateClientController";
import { AuthenticatorClientController } from "./useCases/authenticateClient/AuthenticateClientController";
import { GetAllClientDeliveriesController } from "./useCases/getAllClientDeliveries/GetAllClientDeliveriesController";

const routesClients = Router();

const createClienteController =
    new CreateClienteController();
const authenticatorClientController =
    new AuthenticatorClientController();
const getAllClientDeliveriesController =
    new GetAllClientDeliveriesController();


routesClients.post(
    "/client/create",
    createClienteController.handle
);
routesClients.post(
    "/client/login",
    authenticatorClientController.handle
);
routesClients.get(
    "/client/deliveries",
    ensureAuthenticateClientMiddleware,
    getAllClientDeliveriesController.handle
);

export { routesClients };
