/*
  Warnings:

  - The values [DAILY_LIKE_LIMIT,SEND_MESSAGES,SEE_ONLINE_USERS,BOOST,VIEW_VISITORS,PREMIUM_PHOTOS,VIDEO_CALL,SUPER_LIKE,UNDO] on the enum `Features` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `limitValue` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionId,feature]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `likeLimitValue` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."likeLimit" AS ENUM ('TWENTY', 'FIFTY', 'HUNDRED');

-- CreateEnum
CREATE TYPE "public"."PreferredGender" AS ENUM ('WOMEN', 'MEN');

-- CreateEnum
CREATE TYPE "public"."RelationshipType" AS ENUM ('FRIENDSHIP', 'CASUAL_DATING', 'SERIOUS_RELATIONSHIP', 'MARRIAGE');

-- CreateEnum
CREATE TYPE "public"."DrinkingFrequency" AS ENUM ('NEVER', 'RARELY', 'SOCIALLY', 'REGULARLY');

-- CreateEnum
CREATE TYPE "public"."Religion" AS ENUM ('ISLAM', 'CHRISTIANITY', 'JUDAISM', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('HIGH_SCHOOL', 'BACHELORS', 'MASTERS', 'DOCTORATE', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Features_new" AS ENUM ('UNLIMITED_LIKES', 'SEE_WHO_IS_ONLINE', 'BOOST_PROFILE', 'VIEW_PROFILE_VISITORS', 'LIKE', 'LOVE', 'UNDO_SWIPE', 'HIDE_FROM_TG_CONTACTS');
ALTER TABLE "public"."Permission" ALTER COLUMN "feature" TYPE "public"."Features_new" USING ("feature"::text::"public"."Features_new");
ALTER TYPE "public"."Features" RENAME TO "Features_old";
ALTER TYPE "public"."Features_new" RENAME TO "Features";
DROP TYPE "public"."Features_old";
COMMIT;

-- DropIndex
DROP INDEX "public"."User_telegramId_gender_city_idx";

-- AlterTable
ALTER TABLE "public"."Permission" DROP COLUMN "limitValue",
ADD COLUMN     "likeLimitValue" "public"."likeLimit" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "city",
DROP COLUMN "dob",
DROP COLUMN "nationality";

-- CreateTable
CREATE TABLE "public"."Hobby" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preference" (
    "id" BIGSERIAL NOT NULL,
    "preferredGender" "public"."PreferredGender" NOT NULL,
    "ageRangeMin" INTEGER,
    "ageRangeMax" INTEGER,
    "city" VARCHAR(32) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "nationality" VARCHAR(15),
    "relationshipType" "public"."RelationshipType" NOT NULL,
    "hasChildren" BOOLEAN NOT NULL,
    "smoking" BOOLEAN NOT NULL,
    "drinking" "public"."DrinkingFrequency" NOT NULL,
    "pets" BOOLEAN,
    "religion" "public"."Religion",
    "education" "public"."EducationLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrefferedHobby" (
    "preferenceId" BIGINT NOT NULL,
    "hobbyId" BIGINT NOT NULL,

    CONSTRAINT "PrefferedHobby_pkey" PRIMARY KEY ("preferenceId","hobbyId")
);

-- CreateTable
CREATE TABLE "public"."UserPreference" (
    "userId" BIGINT NOT NULL,
    "preferenceId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId","preferenceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_name_key" ON "public"."Hobby"("name");

-- CreateIndex
CREATE INDEX "Preference_preferredGender_city_relationshipType_idx" ON "public"."Preference"("preferredGender", "city", "relationshipType");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_subscriptionId_feature_key" ON "public"."Permission"("subscriptionId", "feature");

-- CreateIndex
CREATE INDEX "User_telegramId_gender_idx" ON "public"."User"("telegramId", "gender");

-- AddForeignKey
ALTER TABLE "public"."PrefferedHobby" ADD CONSTRAINT "PrefferedHobby_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "public"."Preference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrefferedHobby" ADD CONSTRAINT "PrefferedHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "public"."Hobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPreference" ADD CONSTRAINT "UserPreference_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "public"."Preference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
