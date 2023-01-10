import { prisma } from "../../../../database/prismaCliente";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../../shared/enums";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error(MESSAGES.LOGIN_INVALID);
    }

    const token = sign({ username }, SECRETS.CLIENT, {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
