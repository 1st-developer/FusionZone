/*
  Warnings:

  - Made the column `profile` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "profile" SET NOT NULL;
