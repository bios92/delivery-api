import { prisma } from "../../../../database/prismaCliente";
import { hash } from "bcrypt";
import { MESSAGES } from "../../../../shared/enums";

interface IDeliverymanUseCase {
  username: string;
  password: string;
}

export class CreateDeliveymanUseCase {
  async execute({ username, password }: IDeliverymanUseCase) {
    const isDeliverymanExist = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (isDeliverymanExist) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    const hashedPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return deliveryman;
  }
}
