-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('FILE', 'FOLDER');

-- CreateTable
CREATE TABLE "nodes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NodeType" NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT,
    "extension" TEXT,
    "size" BIGINT,
    "isFragmented" BOOLEAN NOT NULL DEFAULT false,
    "totalChunks" INTEGER NOT NULL DEFAULT 1,
    "originalHash" TEXT,
    "providerId" TEXT NOT NULL,
    "providerFileId" TEXT,
    "providerPath" TEXT DEFAULT 'CloudBase/',
    "providerCreatedAt" TIMESTAMP(3),
    "providerUpdatedAt" TIMESTAMP(3),
    "parentId" TEXT,
    "trashedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_chunks" (
    "id" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "size" BIGINT NOT NULL,
    "startByte" BIGINT NOT NULL,
    "endByte" BIGINT NOT NULL,
    "chunkHash" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerFileId" TEXT,
    "providerPath" TEXT DEFAULT 'CloudBase/_fragments/',
    "providerCreatedAt" TIMESTAMP(3),
    "providerUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "file_chunks_nodeId_idx" ON "file_chunks"("nodeId");

-- CreateIndex
CREATE INDEX "file_chunks_providerId_idx" ON "file_chunks"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "file_chunks_nodeId_chunkIndex_key" ON "file_chunks"("nodeId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_chunks" ADD CONSTRAINT "file_chunks_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_chunks" ADD CONSTRAINT "file_chunks_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
