-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "detailsUrl" TEXT;

-- AlterTable
ALTER TABLE "_BlogToTag" ADD CONSTRAINT "_BlogToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BlogToTag_AB_unique";
