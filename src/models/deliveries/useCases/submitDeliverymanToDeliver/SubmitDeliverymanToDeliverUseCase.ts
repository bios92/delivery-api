import { prisma } from "../../../../database/prismaCliente";

interface ISubmitDeliverymanToDeliver {
  id_deliveryman: string;
  id_delivery: string;
}

export class SubmitDeliverymanToDeliverUseCase {
  async execute({ id_delivery, id_deliveryman }: ISubmitDeliverymanToDeliver) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return result;
  }
}
