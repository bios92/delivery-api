import { Request, Response } from "express";
import { GetAllClientDeliveriesUseCase } from "./GetAllClientDeliveriesUseCase";

export class GetAllClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;

    const getAllClientDeliveriesUseCase = new GetAllClientDeliveriesUseCase();
    
    const deliveries = await getAllClientDeliveriesUseCase.execute({
      id_client,
    });

    return response.status(200).json(deliveries);
  }
}
