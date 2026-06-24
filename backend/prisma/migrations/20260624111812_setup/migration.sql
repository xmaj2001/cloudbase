-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('GOOGLE_DRIVE', 'ONEDRIVE', 'TELEGRAM', 'CLOUDINARY', 'MEGA', 'DROPBOX', 'BOX', 'PCLOUD', 'YANDEX', 'VPS', 'LOCAL_MACHINE');

-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('FILE', 'FOLDER', 'GROUP');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('ACTIVE', 'TRASHED', 'DELETED', 'UNREACHABLE', 'CORRUPTED', 'EXPIRED', 'UPLOADING', 'FRAGMENTING');

-- CreateEnum
CREATE TYPE "ChunkStatus" AS ENUM ('PENDING', 'UPLOADED', 'VERIFIED', 'FAILED');

-- CreateTable
CREATE TABLE "storage_drivers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ProviderType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "credentials" JSONB NOT NULL,
    "rootFolderId" TEXT,
    "rootFolderPath" TEXT,
    "fragmentFolderId" TEXT,
    "fragmentFolderPath" TEXT,
    "cachedTotalSpace" BIGINT,
    "cachedUsedSpace" BIGINT,
    "cachedAvailableSpace" BIGINT,
    "spaceCachedAt" TIMESTAMP(3),
    "lastSyncAt" TIMESTAMP(3),
    "syncError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storage_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NodeType" NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT,
    "extension" TEXT,
    "size" BIGINT,
    "driverId" TEXT,
    "providerFileId" TEXT,
    "providerPath" TEXT,
    "providerCreatedAt" TIMESTAMP(3),
    "providerUpdatedAt" TIMESTAMP(3),
    "isFragmented" BOOLEAN NOT NULL DEFAULT false,
    "totalChunks" INTEGER NOT NULL DEFAULT 1,
    "originalHash" TEXT,
    "parentId" TEXT,
    "status" "FileStatus" NOT NULL DEFAULT 'ACTIVE',
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "lastErrorAt" TIMESTAMP(3),
    "lastCheckedAt" TIMESTAMP(3),
    "trashedAt" TIMESTAMP(3),
    "permanentDeleteAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "expiryNotifiedAt" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "searchVector" TEXT,
    "thumbnailUrl" TEXT,
    "aiClassified" BOOLEAN NOT NULL DEFAULT false,
    "aiCategory" TEXT,
    "aiConfidence" DOUBLE PRECISION,
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_chunks" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "size" BIGINT NOT NULL,
    "byteStart" BIGINT NOT NULL,
    "byteEnd" BIGINT NOT NULL,
    "chunkHash" TEXT NOT NULL,
    "providerFileId" TEXT NOT NULL,
    "providerPath" TEXT NOT NULL,
    "status" "ChunkStatus" NOT NULL DEFAULT 'PENDING',
    "uploadedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "storage_drivers_userId_type_id_key" ON "storage_drivers"("userId", "type", "id");

-- CreateIndex
CREATE INDEX "nodes_userId_status_idx" ON "nodes"("userId", "status");

-- CreateIndex
CREATE INDEX "nodes_userId_parentId_idx" ON "nodes"("userId", "parentId");

-- CreateIndex
CREATE INDEX "nodes_userId_type_idx" ON "nodes"("userId", "type");

-- CreateIndex
CREATE INDEX "nodes_driverId_providerFileId_idx" ON "nodes"("driverId", "providerFileId");

-- CreateIndex
CREATE INDEX "nodes_userId_trashedAt_idx" ON "nodes"("userId", "trashedAt");

-- CreateIndex
CREATE INDEX "nodes_expiresAt_idx" ON "nodes"("expiresAt");

-- CreateIndex
CREATE INDEX "file_chunks_nodeId_idx" ON "file_chunks"("nodeId");

-- CreateIndex
CREATE INDEX "file_chunks_driverId_idx" ON "file_chunks"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "file_chunks_nodeId_chunkIndex_key" ON "file_chunks"("nodeId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "storage_drivers" ADD CONSTRAINT "storage_drivers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "storage_drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_chunks" ADD CONSTRAINT "file_chunks_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_chunks" ADD CONSTRAINT "file_chunks_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "storage_drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
