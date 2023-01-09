import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../shared/enums";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
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
    //Verify if the token is valid or not
    //Force the return type of token
    const { sub } = verify(token, SECRETS.CLIENT) as IPayload;

    //Insert sub into the request properties, but we need to create a new type for the sub
    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: MESSAGES.TOKEN_INVALID,
    });
  }
}
