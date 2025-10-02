/*
  Warnings:

  - You are about to drop the column `is_online` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_seen` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "base"."users" DROP COLUMN "is_online",
DROP COLUMN "last_seen";

-- CreateTable
CREATE TABLE "base"."chats" (
    "id" SERIAL NOT NULL,
    "user1_id" BIGINT NOT NULL,
    "user2_id" BIGINT NOT NULL,
    "last_message" TEXT,
    "is_unread" INTEGER NOT NULL DEFAULT 0,
    "is_typing" BOOLEAN NOT NULL DEFAULT false,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "last_seen" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chats_is_unread_is_typing_idx" ON "base"."chats"("is_unread", "is_typing");

-- AddForeignKey
ALTER TABLE "base"."chats" ADD CONSTRAINT "chats_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."chats" ADD CONSTRAINT "chats_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
