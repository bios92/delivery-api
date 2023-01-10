import { Router } from "express";

import { routesDeliveryman } from "./deliveryman/routesDeliveryman";
import { routesClients } from "./clients/routesClients";
import { routesDeliveries } from "./deliveries/routesDeliveries";

const routes = Router();

routes.use(
  routesDeliveryman,
  routesClients,
  routesDeliveries
);

export { routes };
