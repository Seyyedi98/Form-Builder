/*
  Warnings:

  - Added the required column `content` to the `FormSubmisstion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FormSubmisstion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formsubmisstion` ADD COLUMN `content` LONGTEXT NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
