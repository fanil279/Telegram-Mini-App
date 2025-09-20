-- CreateEnum
CREATE TYPE "public"."LikeType" AS ENUM ('FRIEND', 'CUTE', 'SYMPATHY', 'LIKE', 'LOVE');

-- CreateEnum
CREATE TYPE "public"."AttachmentType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'FILE');

-- CreateEnum
CREATE TYPE "public"."StorageProvider" AS ENUM ('TELEGRAM');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('MESSAGE', 'ALERT', 'REMINDER', 'UPDATE');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('UZCARD', 'HUMO', 'VISA');

-- CreateEnum
CREATE TYPE "public"."CurrencyType" AS ENUM ('UZS', 'USD');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."Features" AS ENUM ('DAILY_LIKE_LIMIT', 'SEND_MESSAGES', 'SEE_ONLINE_USERS', 'BOOST', 'VIEW_VISITORS', 'PREMIUM_PHOTOS', 'VIDEO_CALL', 'SUPER_LIKE', 'UNDO');

-- CreateEnum
CREATE TYPE "public"."ReasonType" AS ENUM ('SPAM', 'SCAM', 'HARASSMENT', 'INAPPROPRIATE_CONTENT', 'MESSAGE_IGNORED', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."SubscriptionPlanType" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."UserPlanType" AS ENUM ('FREE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."Block" (
    "id" BIGSERIAL NOT NULL,
    "blockerId" BIGINT NOT NULL,
    "blockedId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" BIGSERIAL NOT NULL,
    "likerId" BIGINT NOT NULL,
    "likedId" BIGINT NOT NULL,
    "type" "public"."LikeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Match" (
    "id" BIGSERIAL NOT NULL,
    "user1Id" BIGINT NOT NULL,
    "user2Id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" BIGSERIAL NOT NULL,
    "matchId" BIGINT,
    "senderTelegramId" BIGINT,
    "receiverTelegramId" BIGINT,
    "replyToId" BIGINT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MessageAttachment" (
    "id" BIGSERIAL NOT NULL,
    "messageId" BIGINT,
    "type" "public"."AttachmentType" NOT NULL,
    "url" TEXT NOT NULL,
    "storageProvider" "public"."StorageProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "matchId" BIGINT,
    "likeId" BIGINT,
    "paymentId" BIGINT,
    "messageId" BIGINT,
    "type" "public"."NotificationType" NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" BIGSERIAL NOT NULL,
    "transactionId" VARCHAR(128),
    "userId" BIGINT NOT NULL,
    "subscriptionId" BIGINT,
    "method" "public"."PaymentMethod" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" "public"."CurrencyType" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Permission" (
    "id" BIGSERIAL NOT NULL,
    "subscriptionId" BIGINT NOT NULL,
    "feature" "public"."Features" NOT NULL,
    "limitValue" INTEGER,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Report" (
    "id" BIGSERIAL NOT NULL,
    "matchId" BIGINT,
    "messageId" BIGINT,
    "reporterId" BIGINT,
    "reportedId" BIGINT,
    "reviewedById" BIGINT,
    "reason" "public"."ReasonType" NOT NULL,
    "explanation" VARCHAR(255),
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "plan" "public"."SubscriptionPlanType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TgChannelSubscriber" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "channelId" BIGINT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "TgChannelSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" BIGSERIAL NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "username" VARCHAR(32),
    "fullName" VARCHAR(64) NOT NULL,
    "bio" VARCHAR(70),
    "dob" TIMESTAMP(3),
    "nationality" VARCHAR(15),
    "city" VARCHAR(32),
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" TIMESTAMP(3),
    "plan" "public"."UserPlanType" NOT NULL DEFAULT 'FREE',
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPhoto" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "isMainProfilePhoto" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Block_blockerId_blockedId_idx" ON "public"."Block"("blockerId", "blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockerId_blockedId_key" ON "public"."Block"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "Like_likerId_likedId_type_idx" ON "public"."Like"("likerId", "likedId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Like_likerId_likedId_key" ON "public"."Like"("likerId", "likedId");

-- CreateIndex
CREATE INDEX "Match_user1Id_user2Id_idx" ON "public"."Match"("user1Id", "user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_user1Id_user2Id_key" ON "public"."Match"("user1Id", "user2Id");

-- CreateIndex
CREATE INDEX "Message_matchId_senderTelegramId_receiverTelegramId_replyTo_idx" ON "public"."Message"("matchId", "senderTelegramId", "receiverTelegramId", "replyToId", "createdAt");

-- CreateIndex
CREATE INDEX "MessageAttachment_messageId_type_idx" ON "public"."MessageAttachment"("messageId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_matchId_key" ON "public"."Notification"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_likeId_key" ON "public"."Notification"("likeId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_paymentId_key" ON "public"."Notification"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_messageId_key" ON "public"."Notification"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- CreateIndex
CREATE INDEX "Payment_userId_transactionId_subscriptionId_createdAt_idx" ON "public"."Payment"("userId", "transactionId", "subscriptionId", "createdAt");

-- CreateIndex
CREATE INDEX "Permission_subscriptionId_idx" ON "public"."Permission"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_messageId_key" ON "public"."Report"("messageId");

-- CreateIndex
CREATE INDEX "Report_reporterId_reportedId_createdAt_idx" ON "public"."Report"("reporterId", "reportedId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Report_reporterId_reportedId_reason_key" ON "public"."Report"("reporterId", "reportedId", "reason");

-- CreateIndex
CREATE INDEX "Subscription_userId_endDate_idx" ON "public"."Subscription"("userId", "endDate");

-- CreateIndex
CREATE INDEX "TgChannelSubscriber_userId_channelId_idx" ON "public"."TgChannelSubscriber"("userId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "public"."User"("telegramId");

-- CreateIndex
CREATE INDEX "User_telegramId_gender_city_idx" ON "public"."User"("telegramId", "gender", "city");

-- CreateIndex
CREATE INDEX "UserPhoto_userId_idx" ON "public"."UserPhoto"("userId");

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_likerId_fkey" FOREIGN KEY ("likerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_likedId_fkey" FOREIGN KEY ("likedId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderTelegramId_fkey" FOREIGN KEY ("senderTelegramId") REFERENCES "public"."User"("telegramId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_receiverTelegramId_fkey" FOREIGN KEY ("receiverTelegramId") REFERENCES "public"."User"("telegramId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageAttachment" ADD CONSTRAINT "MessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "public"."Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Permission" ADD CONSTRAINT "Permission_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TgChannelSubscriber" ADD CONSTRAINT "TgChannelSubscriber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPhoto" ADD CONSTRAINT "UserPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
