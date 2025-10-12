/*
  Warnings:

  - You are about to drop the `tg_channel_subscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "base"."tg_channel_subscribers" DROP CONSTRAINT "tg_channel_subscribers_user_id_fkey";

-- DropTable
DROP TABLE "base"."tg_channel_subscribers";
