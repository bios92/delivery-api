import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticatorClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClient = new AuthenticateClientUseCase();

    const result = await authenticateClient.execute({ username, password });

    return response.json(result);
  }
}
