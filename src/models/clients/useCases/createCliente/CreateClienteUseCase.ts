import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaCliente";
import { MESSAGES } from "../../../../shared/enums";

interface ICreateCliente {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateCliente) {
    //Validar se o usuario existe
    const isClientExist = await prisma.clients.findFirst({
      where: { username },
    });

    if (isClientExist) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    //Criptografar a senha
    const hashPassword = await hash(password, 10);

    //Salvar o cliente
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
