import { Request, Response } from "express";
import { CreateDeliveymanUseCase } from "./CreateDeliverymanUseCase";
import { MESSAGES } from "../../../../shared/enums";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createDeliverymanUseCase = new CreateDeliveymanUseCase();

    const deliveryman = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response
      .status(201)
      .json({ message: MESSAGES.DELIVERYMAN_CREATED, deliveryman });
  }
}
