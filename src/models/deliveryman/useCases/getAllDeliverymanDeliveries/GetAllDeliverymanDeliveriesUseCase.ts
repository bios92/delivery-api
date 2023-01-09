import { prisma } from "../../../../database/prismaCliente";

export class GetAllDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findUnique({
      where: { id: id_deliveryman },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}
