import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaCliente";
import { sign } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../../shared/enums";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error(MESSAGES.LOGIN_INVALID);
    }

    const token = sign({ username }, SECRETS.DELIVERYMAN, {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
