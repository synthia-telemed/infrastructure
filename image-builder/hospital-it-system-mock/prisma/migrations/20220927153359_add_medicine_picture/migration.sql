/*
  Warnings:

  - Added the required column `pictureURL` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Medicine" ADD COLUMN     "pictureURL" TEXT NOT NULL ;
ALTER TABLE "Medicine" ADD COLUMN     "pictureURL" TEXT NOT NULL default 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/many-colorful-pills-royalty-free-image-504370555-1542820898.jpg?crop=0.670xw:1.00xh;0,0&resize=480:*';
