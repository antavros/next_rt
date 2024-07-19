/*
  Warnings:

  - You are about to drop the column `authorId` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToTitle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `engname` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTitle" DROP CONSTRAINT "_CategoryToTitle_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTitle" DROP CONSTRAINT "_CategoryToTitle_B_fkey";

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "authorId",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "engname" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "_CategoryToTitle";

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTitle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "rating" INTEGER,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListTitle" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTitle_userId_titleId_key" ON "UserTitle"("userId", "titleId");

-- CreateIndex
CREATE UNIQUE INDEX "ListTitle_listId_titleId_key" ON "ListTitle"("listId", "titleId");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTitle" ADD CONSTRAINT "UserTitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTitle" ADD CONSTRAINT "UserTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListTitle" ADD CONSTRAINT "ListTitle_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListTitle" ADD CONSTRAINT "ListTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;
