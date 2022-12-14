/*
  Warnings:

  - Added the required column `profilePicURL` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "profilePicURL" TEXT NOT NULL default 'https://img.cscms.me/X53hRfCNpi9bGzEGH2gn.png';
