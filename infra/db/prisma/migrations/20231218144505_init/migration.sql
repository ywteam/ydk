/*
  Warnings:

  - You are about to drop the `y_banned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_blacklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_credentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_hashes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_identy_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_quarentines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_restrictions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_team_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_user_identities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `y_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "y_authz_permissions" DROP CONSTRAINT "y_authz_permissions_memberId_fkey";

-- DropForeignKey
ALTER TABLE "y_authz_permissions" DROP CONSTRAINT "y_authz_permissions_teamId_fkey";

-- DropForeignKey
ALTER TABLE "y_authz_permissions" DROP CONSTRAINT "y_authz_permissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "y_hashes" DROP CONSTRAINT "y_hashes_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "y_identy_accounts" DROP CONSTRAINT "y_identy_accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "y_notifications" DROP CONSTRAINT "y_notifications_topicId_fkey";

-- DropForeignKey
ALTER TABLE "y_sessions" DROP CONSTRAINT "y_sessions_accountId_fkey";

-- DropForeignKey
ALTER TABLE "y_sessions" DROP CONSTRAINT "y_sessions_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "y_subscriptions" DROP CONSTRAINT "y_subscriptions_identityId_fkey";

-- DropForeignKey
ALTER TABLE "y_team_members" DROP CONSTRAINT "y_team_members_teamId_fkey";

-- DropForeignKey
ALTER TABLE "y_team_members" DROP CONSTRAINT "y_team_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "y_teams" DROP CONSTRAINT "y_teams_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "y_tenant_invites" DROP CONSTRAINT "y_tenant_invites_teamId_fkey";

-- DropForeignKey
ALTER TABLE "y_tenants" DROP CONSTRAINT "y_tenants_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "y_user_identities" DROP CONSTRAINT "y_user_identities_userId_fkey";

-- DropTable
DROP TABLE "y_banned";

-- DropTable
DROP TABLE "y_blacklist";

-- DropTable
DROP TABLE "y_credentials";

-- DropTable
DROP TABLE "y_devices";

-- DropTable
DROP TABLE "y_groups";

-- DropTable
DROP TABLE "y_hashes";

-- DropTable
DROP TABLE "y_identy_accounts";

-- DropTable
DROP TABLE "y_notifications";

-- DropTable
DROP TABLE "y_quarentines";

-- DropTable
DROP TABLE "y_restrictions";

-- DropTable
DROP TABLE "y_team_members";

-- DropTable
DROP TABLE "y_teams";

-- DropTable
DROP TABLE "y_user_identities";

-- DropTable
DROP TABLE "y_users";

-- CreateTable
CREATE TABLE "y_auth_refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_auth_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_session_devices" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_session_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_idm_users" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "loginAttempts" INTEGER DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "lastAccountId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_idm_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_idm_user_identities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_idm_user_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_idm_identy_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "method" INTEGER NOT NULL,
    "provider" INTEGER,
    "lastLogin" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "uuid" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_idm_identy_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_authz_groups" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_authz_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_tenant_teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_tenant_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_tenant_team_members" (
    "id" TEXT NOT NULL,
    "teamId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_tenant_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_subscriptions_notifications" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_subscriptions_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_blacklist" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "action" INTEGER NOT NULL,
    "reason" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_restrictions" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_quarentines" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "reason" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_quarentines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_banned" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "reason" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_banned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_hashes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL DEFAULT 'scrypt',
    "signerKey" TEXT NOT NULL,
    "saltSeparator" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "memoryCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_hashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_credentials" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_security_password_history" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_security_password_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "y_auth_refresh_tokens_token_key" ON "y_auth_refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "y_idm_user_identities_userId_key" ON "y_idm_user_identities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "y_idm_identy_accounts_email_key" ON "y_idm_identy_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "y_idm_identy_accounts_phone_key" ON "y_idm_identy_accounts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "y_idm_identy_accounts_uuid_key" ON "y_idm_identy_accounts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "y_authz_groups_uid_key" ON "y_authz_groups"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "y_tenant_teams_name_key" ON "y_tenant_teams"("name");

-- CreateIndex
CREATE INDEX "team_id_unique" ON "y_tenant_team_members"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "y_security_hashes_tenantId_key" ON "y_security_hashes"("tenantId");

-- AddForeignKey
ALTER TABLE "y_sessions" ADD CONSTRAINT "y_sessions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "y_session_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_sessions" ADD CONSTRAINT "y_sessions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "y_idm_identy_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_idm_user_identities" ADD CONSTRAINT "y_idm_user_identities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_idm_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_idm_identy_accounts" ADD CONSTRAINT "y_idm_identy_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_idm_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_idm_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_tenant_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "y_tenant_team_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenants" ADD CONSTRAINT "y_tenants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "y_idm_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_invites" ADD CONSTRAINT "y_tenant_invites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_tenant_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_teams" ADD CONSTRAINT "y_tenant_teams_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "y_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_team_members" ADD CONSTRAINT "y_tenant_team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_tenant_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_team_members" ADD CONSTRAINT "y_tenant_team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_idm_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_subscriptions" ADD CONSTRAINT "y_subscriptions_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "y_idm_user_identities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_subscriptions_notifications" ADD CONSTRAINT "y_subscriptions_notifications_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "y_subscriptions_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_security_hashes" ADD CONSTRAINT "y_security_hashes_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "y_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
