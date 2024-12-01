/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `dosen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dosen_email_key" ON "dosen"("email");
