/*
  Warnings:

  - You are about to drop the column `id_cliente` on the `deliveries` table. All the data in the column will be lost.
  - Added the required column `id_client` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_cliente_fkey";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "id_cliente",
ADD COLUMN     "id_client" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
