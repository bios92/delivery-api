import { Request, Response } from "express";
import { CompleteDeliveryByDeliverymanUseCase } from "./CompleteDeliveryByDeliverymanUseCase";

export class CompleteDeliveryByDeliverymanController {

  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const completeDeliveryByDeliverymanUseCase = new CompleteDeliveryByDeliverymanUseCase();

    const delivery = await completeDeliveryByDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery,
    });

    return response.status(200).json(delivery);
  }

}
