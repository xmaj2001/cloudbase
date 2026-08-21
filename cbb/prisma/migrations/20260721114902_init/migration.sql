/*
  Warnings:

  - You are about to drop the column `whatsappNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `file_chunks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storage_drivers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "file_chunks" DROP CONSTRAINT "file_chunks_driverId_fkey";

-- DropForeignKey
ALTER TABLE "file_chunks" DROP CONSTRAINT "file_chunks_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_driverId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_parentId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_userId_fkey";

-- DropForeignKey
ALTER TABLE "storage_drivers" DROP CONSTRAINT "storage_drivers_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "whatsappNumber";

-- DropTable
DROP TABLE "file_chunks";

-- DropTable
DROP TABLE "nodes";

-- DropTable
DROP TABLE "storage_drivers";

-- DropEnum
DROP TYPE "ChunkStatus";

-- DropEnum
DROP TYPE "FileStatus";

-- DropEnum
DROP TYPE "NodeType";

-- DropEnum
DROP TYPE "ProviderType";
