import { prisma } from "../../../../database/prismaCliente";

interface ICreateDeliveryUseCase {
  id_client: string;
  item_name: string;
}

export class CreateDeliveryUseCase {
  async execute({ id_client, item_name }: ICreateDeliveryUseCase) {
    console.log(id_client, item_name);
    const delivery = await prisma.deliveries.create({
      data: {
        id_client,
        item_name,
      },
    });

    return delivery;
  }
}
