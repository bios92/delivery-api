import { Request, Response } from "express";
import { SubmitDeliverymanToDeliverUseCase } from "./SubmitDeliverymanToDeliverUseCase";
import { MESSAGES } from "../../../../shared/enums";

export class SubmitDeliverymanToDeliverController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const submitDeliverymanToDeliverUseCase =
      new SubmitDeliverymanToDeliverUseCase();

    const delivery = await submitDeliverymanToDeliverUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response
      .status(200)
      .json({ message: MESSAGES.SUBMITED_DELIVERY, delivery });
  }
}
