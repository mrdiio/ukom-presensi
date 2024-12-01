/*
  Warnings:

  - Added the required column `tanggal` to the `jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jadwal" ADD COLUMN     "tanggal" DATE NOT NULL;
