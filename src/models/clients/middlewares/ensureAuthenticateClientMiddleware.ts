import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../shared/enums";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClientMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const bearerToken = request.headers.authorization;
  if (!bearerToken) {
    return response.status(401).json({ message: MESSAGES.TOKEN_MISSING });
  }
  const [_, token] = bearerToken.split(" ");
  try {
    const { sub } = verify(token, SECRETS.CLIENT) as IPayload;
    request.id_client = sub;
    return next();
  } catch (error) {
    return response.status(401).json({ message: MESSAGES.TOKEN_INVALID });
  }
}
