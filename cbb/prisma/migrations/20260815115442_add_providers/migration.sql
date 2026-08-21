-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('GOOGLE_DRIVE', 'ONEDRIVE', 'TELEGRAM', 'CLOUDINARY', 'MEGA', 'DROPBOX', 'BOX', 'PCLOUD', 'YANDEX', 'VPS', 'LOCAL_MACHINE');

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ProviderType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "credentials" JSONB NOT NULL,
    "folderPath" TEXT,
    "lastSyncAt" TIMESTAMP(3),
    "syncError" TEXT,
    "totalSpace" BIGINT,
    "usedSpace" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_userId_type_id_key" ON "providers"("userId", "type", "id");

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
