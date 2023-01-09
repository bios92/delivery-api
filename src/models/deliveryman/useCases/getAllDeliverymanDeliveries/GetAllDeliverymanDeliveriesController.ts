import { Request, Response } from "express";
import { GetAllDeliverymanDeliveriesUseCase } from "./GetAllDeliverymanDeliveriesUseCase";

export class GetAllDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const getAllDeliverymanDeliveriesUseCase =
      new GetAllDeliverymanDeliveriesUseCase();

    const deliveries = await getAllDeliverymanDeliveriesUseCase.execute(
      id_deliveryman
    );

    return response.status(200).json(deliveries);
  }
}
