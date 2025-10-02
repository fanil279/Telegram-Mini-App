/*
  Warnings:

  - You are about to alter the column `url` on the `message_attachments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2048)`.
  - You are about to drop the column `receiver_telegram_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sender_telegram_id` on the `messages` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - A unique constraint covering the columns `[user1_id,user2_id]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "base"."messages" DROP CONSTRAINT "messages_receiver_telegram_id_fkey";

-- DropForeignKey
ALTER TABLE "base"."messages" DROP CONSTRAINT "messages_sender_telegram_id_fkey";

-- DropIndex
DROP INDEX "base"."messages_match_id_sender_telegram_id_receiver_telegram_id_r_idx";

-- AlterTable
ALTER TABLE "base"."message_attachments" ALTER COLUMN "url" SET DATA TYPE VARCHAR(2048);

-- AlterTable
ALTER TABLE "base"."messages" DROP COLUMN "receiver_telegram_id",
DROP COLUMN "sender_telegram_id",
ADD COLUMN     "receiver_id" BIGINT,
ADD COLUMN     "sender_id" BIGINT,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(1000);

-- CreateIndex
CREATE UNIQUE INDEX "chats_user1_id_user2_id_key" ON "base"."chats"("user1_id", "user2_id");

-- CreateIndex
CREATE INDEX "messages_match_id_sender_id_receiver_id_reply_to_id_created_idx" ON "base"."messages"("match_id", "sender_id", "receiver_id", "reply_to_id", "created_at");

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "base"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "base"."users"("telegramId") ON DELETE SET NULL ON UPDATE CASCADE;
