import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";
import { MESSAGES } from "../../../../shared/enums";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name } = request.body;
    const { id_client } = request;

    console.log(id_client);
    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeliveryUseCase.execute({
      id_client,
      item_name,
    });

    return response.status(201).json({
      message: MESSAGES.DELIVERY_CREATED,
      delivery,
    });
  }
}
