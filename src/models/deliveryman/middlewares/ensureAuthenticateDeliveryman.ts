import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../shared/enums";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: MESSAGES.TOKEN_MISSING,
    });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, SECRETS.DELIVERYMAN) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: MESSAGES.TOKEN_INVALID });
  }
}