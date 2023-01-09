import { prisma } from "../../../../database/prismaCliente";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { MESSAGES, SECRETS } from "../../../../shared/enums";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  //Receber username e password
  async execute({ username, password }: IAuthenticateClient) {
    //Verificar se o username está cadastrado
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error(MESSAGES.USERNAME_ALREADY_EXIST);
    }

    //Verificar se a senha correesponde ao username - Precisamos pegar a senha que o usuári envia, criptografar e comparar com a senha que está no banco.
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error(MESSAGES.LOGIN_INVALID); //Por padrão o express não consegue fazer essa tratativa de erros, por tanto isso gerar um erro
    }

    //Gerar token
    const token = sign({ username }, SECRETS.CLIENT, {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
