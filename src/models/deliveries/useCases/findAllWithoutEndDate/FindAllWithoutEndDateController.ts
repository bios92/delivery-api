import { Request, Response } from "express";
import { FindAllWithoutEndDateUseCase } from "./FindAllWithoutEndDateUseCase";

export class FindAllWithoutEndDateController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndUseCase = new FindAllWithoutEndDateUseCase();
    const deliveries = await findAllWithoutEndUseCase.execute();

    return response.status(200).json(deliveries);
  }
}
