import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaCliente";
import { MESSAGES } from "../../../../shared/enums";

interface ICreateCliente {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateCliente) {
    const isClientExist = await prisma.clients.findFirst({
      where: { username },
    });

    if (isClientExist) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    client.password = "";

    return client;
  }
}
