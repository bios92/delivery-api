-- CreateTable
CREATE TABLE "Deliveries" (
    "id" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_deliveryman" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deliveries" ADD CONSTRAINT "Deliveries_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliveries" ADD CONSTRAINT "Deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
