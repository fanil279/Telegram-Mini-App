-- CreateEnum
CREATE TYPE "base"."like_type" AS ENUM ('FRIEND', 'CUTE', 'SYMPATHY', 'LIKE', 'LOVE');

-- CreateEnum
CREATE TYPE "base"."attachment_type" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "base"."storage_provider" AS ENUM ('TELEGRAM');

-- CreateEnum
CREATE TYPE "base"."notification_type" AS ENUM ('MESSAGE', 'ALERT', 'REMINDER', 'UPDATE');

-- CreateEnum
CREATE TYPE "base"."payment_method" AS ENUM ('UZCARD', 'HUMO', 'VISA');

-- CreateEnum
CREATE TYPE "base"."currency_type" AS ENUM ('UZS', 'USD');

-- CreateEnum
CREATE TYPE "base"."payment_status" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "base"."features" AS ENUM ('SEE_WHO_IS_ONLINE', 'BOOST_PROFILE', 'VIEW_PROFILE_VISITORS', 'LIKE', 'LOVE', 'UNDO_SWIPE', 'HIDE_FROM_TG_CONTACTS', 'AVATAR_VIDEOS', 'MULTIPLE_AVATAR_PHOTOS_VIDEOS', 'HIDE_RECEIPTS', 'REACTIONS_TEN', 'REACTIONS_THIRTY', 'REACTIONS_FIFTY', 'REACTIONS_SEVENTY', 'REACTIONS_UNLIMITED');

-- CreateEnum
CREATE TYPE "base"."relationship_type" AS ENUM ('FRIENDSHIP', 'CASUAL_DATING', 'SERIOUS_RELATIONSHIP', 'MARRIAGE');

-- CreateEnum
CREATE TYPE "base"."drinking_frequency" AS ENUM ('NEVER', 'RARELY', 'SOCIALLY', 'REGULARLY');

-- CreateEnum
CREATE TYPE "base"."religion" AS ENUM ('ISLAM', 'CHRISTIANITY', 'JUDAISM', 'OTHER');

-- CreateEnum
CREATE TYPE "base"."education_level" AS ENUM ('HIGH_SCHOOL', 'BACHELORS', 'MASTERS', 'DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "base"."reason_type" AS ENUM ('SPAM', 'SCAM', 'HARASSMENT', 'INAPPROPRIATE_CONTENT', 'MESSAGE_IGNORED', 'OTHER');

-- CreateEnum
CREATE TYPE "base"."status" AS ENUM ('PENDING', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "base"."subscription_plan_type" AS ENUM ('FREE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "base"."gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "base"."role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "base"."blocks" (
    "id" BIGSERIAL NOT NULL,
    "blocker_id" BIGINT NOT NULL,
    "blocked_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "base"."hobbies" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."likes" (
    "id" BIGSERIAL NOT NULL,
    "liker_id" BIGINT NOT NULL,
    "liked_id" BIGINT NOT NULL,
    "type" "base"."like_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."matches" (
    "id" BIGSERIAL NOT NULL,
    "user1_id" BIGINT NOT NULL,
    "user2_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."messages" (
    "id" BIGSERIAL NOT NULL,
    "match_id" BIGINT,
    "sender_id" BIGINT,
    "receiver_id" BIGINT,
    "reply_to_id" BIGINT,
    "content" VARCHAR(1000) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."message_attachments" (
    "id" BIGSERIAL NOT NULL,
    "message_id" BIGINT,
    "type" "base"."attachment_type" NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "storage_provider" "base"."storage_provider" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."notifications" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "match_id" BIGINT,
    "like_id" BIGINT,
    "payment_id" BIGINT,
    "message_id" BIGINT,
    "type" "base"."notification_type" NOT NULL,
    "content" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."payments" (
    "id" BIGSERIAL NOT NULL,
    "transaction_id" VARCHAR(128),
    "user_id" BIGINT NOT NULL,
    "subscription_id" BIGINT,
    "method" "base"."payment_method" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" "base"."currency_type" NOT NULL,
    "status" "base"."payment_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."permissions" (
    "id" BIGSERIAL NOT NULL,
    "feature" "base"."features" NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."preferences" (
    "id" BIGSERIAL NOT NULL,
    "age_range_min" INTEGER,
    "age_range_max" INTEGER,
    "preffered_nationality" VARCHAR(15),
    "relationship_type" "base"."relationship_type" NOT NULL,
    "has_children" BOOLEAN,
    "is_smoking" BOOLEAN,
    "is_drinking" "base"."drinking_frequency",
    "has_pets" BOOLEAN,
    "religion" "base"."religion",
    "partner_education" "base"."education_level",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."preffered_hobbies" (
    "preference_id" BIGINT NOT NULL,
    "hobby_id" BIGINT NOT NULL,

    CONSTRAINT "preffered_hobbies_pkey" PRIMARY KEY ("preference_id","hobby_id")
);

-- CreateTable
CREATE TABLE "base"."reports" (
    "id" BIGSERIAL NOT NULL,
    "match_id" BIGINT,
    "message_id" BIGINT,
    "reporter_id" BIGINT,
    "reported_id" BIGINT,
    "reviewed_by" BIGINT,
    "reason" "base"."reason_type" NOT NULL,
    "explanation" VARCHAR(255),
    "status" "base"."status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."subscriptions_permissions" (
    "subscription_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,

    CONSTRAINT "subscriptions_permissions_pkey" PRIMARY KEY ("subscription_id","permission_id")
);

-- CreateTable
CREATE TABLE "base"."subscriptions" (
    "id" BIGSERIAL NOT NULL,
    "plan" "base"."subscription_plan_type" NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."user_preferences" (
    "user_id" BIGINT NOT NULL,
    "preference_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id","preference_id")
);

-- CreateTable
CREATE TABLE "base"."users" (
    "id" BIGSERIAL NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "gender" "base"."gender" NOT NULL,
    "username" VARCHAR(32),
    "fullname" VARCHAR(64) NOT NULL,
    "bio" VARCHAR(70),
    "city" VARCHAR(32) NOT NULL,
    "age" INTEGER NOT NULL,
    "nationality" VARCHAR(15),
    "plan" "base"."subscription_plan_type" NOT NULL DEFAULT 'FREE',
    "role" "base"."role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."users_avatars" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "is_main_profile_photo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_avatars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blocks_blocker_id_blocked_id_idx" ON "base"."blocks"("blocker_id", "blocked_id");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_blocker_id_blocked_id_key" ON "base"."blocks"("blocker_id", "blocked_id");

-- CreateIndex
CREATE INDEX "chats_is_unread_is_typing_idx" ON "base"."chats"("is_unread", "is_typing");

-- CreateIndex
CREATE UNIQUE INDEX "chats_user1_id_user2_id_key" ON "base"."chats"("user1_id", "user2_id");

-- CreateIndex
CREATE UNIQUE INDEX "hobbies_name_key" ON "base"."hobbies"("name");

-- CreateIndex
CREATE INDEX "likes_liker_id_liked_id_type_idx" ON "base"."likes"("liker_id", "liked_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "likes_liker_id_liked_id_key" ON "base"."likes"("liker_id", "liked_id");

-- CreateIndex
CREATE INDEX "matches_user1_id_user2_id_idx" ON "base"."matches"("user1_id", "user2_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_user1_id_user2_id_key" ON "base"."matches"("user1_id", "user2_id");

-- CreateIndex
CREATE INDEX "messages_match_id_sender_id_receiver_id_reply_to_id_created_idx" ON "base"."messages"("match_id", "sender_id", "receiver_id", "reply_to_id", "created_at");

-- CreateIndex
CREATE INDEX "message_attachments_message_id_type_idx" ON "base"."message_attachments"("message_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_match_id_key" ON "base"."notifications"("match_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_like_id_key" ON "base"."notifications"("like_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_payment_id_key" ON "base"."notifications"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_message_id_key" ON "base"."notifications"("message_id");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "base"."notifications"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "base"."payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_user_id_transaction_id_subscription_id_created_at_idx" ON "base"."payments"("user_id", "transaction_id", "subscription_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_feature_key" ON "base"."permissions"("feature");

-- CreateIndex
CREATE INDEX "preferences_age_range_min_age_range_max_relationship_type_idx" ON "base"."preferences"("age_range_min", "age_range_max", "relationship_type");

-- CreateIndex
CREATE UNIQUE INDEX "reports_message_id_key" ON "base"."reports"("message_id");

-- CreateIndex
CREATE INDEX "reports_reporter_id_reported_id_created_at_idx" ON "base"."reports"("reporter_id", "reported_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "reports_reporter_id_reported_id_reason_key" ON "base"."reports"("reporter_id", "reported_id", "reason");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_plan_key" ON "base"."subscriptions"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "base"."users"("telegramId");

-- CreateIndex
CREATE INDEX "users_telegramId_gender_city_idx" ON "base"."users"("telegramId", "gender", "city");

-- CreateIndex
CREATE INDEX "users_avatars_user_id_idx" ON "base"."users_avatars"("user_id");

-- AddForeignKey
ALTER TABLE "base"."blocks" ADD CONSTRAINT "blocks_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."blocks" ADD CONSTRAINT "blocks_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."chats" ADD CONSTRAINT "chats_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."chats" ADD CONSTRAINT "chats_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."likes" ADD CONSTRAINT "likes_liker_id_fkey" FOREIGN KEY ("liker_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."likes" ADD CONSTRAINT "likes_liked_id_fkey" FOREIGN KEY ("liked_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."matches" ADD CONSTRAINT "matches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."matches" ADD CONSTRAINT "matches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "base"."matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "base"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "base"."users"("telegramId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."messages" ADD CONSTRAINT "messages_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "base"."messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."message_attachments" ADD CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "base"."messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."notifications" ADD CONSTRAINT "notifications_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "base"."matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."notifications" ADD CONSTRAINT "notifications_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "base"."likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."notifications" ADD CONSTRAINT "notifications_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "base"."payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."notifications" ADD CONSTRAINT "notifications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "base"."messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."payments" ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "base"."subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."preffered_hobbies" ADD CONSTRAINT "preffered_hobbies_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "base"."preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."preffered_hobbies" ADD CONSTRAINT "preffered_hobbies_hobby_id_fkey" FOREIGN KEY ("hobby_id") REFERENCES "base"."hobbies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."reports" ADD CONSTRAINT "reports_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "base"."matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."reports" ADD CONSTRAINT "reports_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "base"."messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "base"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."reports" ADD CONSTRAINT "reports_reported_id_fkey" FOREIGN KEY ("reported_id") REFERENCES "base"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."reports" ADD CONSTRAINT "reports_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "base"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."subscriptions_permissions" ADD CONSTRAINT "subscriptions_permissions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "base"."subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."subscriptions_permissions" ADD CONSTRAINT "subscriptions_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "base"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "base"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."user_preferences" ADD CONSTRAINT "user_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "base"."preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."users_avatars" ADD CONSTRAINT "users_avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
