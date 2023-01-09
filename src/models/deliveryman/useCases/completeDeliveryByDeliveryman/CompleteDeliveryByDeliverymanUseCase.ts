import { prisma } from "../../../../database/prismaCliente";

interface ICompleteDeliveryByDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class CompleteDeliveryByDeliverymanUseCase {
  async execute({
    id_delivery,
    id_deliveryman,
  }: ICompleteDeliveryByDeliveryman) {
    const delivery = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        end_at: new Date(),
      },
    });

    return delivery;
  }
}
