import { prisma } from "../../../../database/prismaCliente";

interface IGetAllClientDeliveries {
  id_client: string;
}

export class GetAllClientDeliveriesUseCase {
  async execute({ id_client }: IGetAllClientDeliveries) {
    const deliveries = await prisma.clients.findUnique({
      where: { id: id_client },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });
    
    return deliveries;
  }
}
