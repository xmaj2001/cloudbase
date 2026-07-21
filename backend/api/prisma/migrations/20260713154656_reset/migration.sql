-- AlterTable
ALTER TABLE "file_chunks" ADD COLUMN     "encryptionAlgo" TEXT,
ADD COLUMN     "encryptionIv" TEXT,
ADD COLUMN     "encryptionKeyRef" TEXT;

-- AlterTable
ALTER TABLE "storage_drivers" ADD COLUMN     "maxFileSizeOverride" BIGINT;
