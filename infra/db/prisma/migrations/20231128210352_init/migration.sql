-- CreateTable
CREATE TABLE "y_users" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "roles" INTEGER[],
    "loginAttempts" INTEGER DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "lastAccountId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_user_identities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_user_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_identy_accounts" (
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
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_identy_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_sessions" (
    "id" TEXT NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logoutAt" TIMESTAMP(3),
    "deviceId" TEXT,
    "accountId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_devices" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_subscriptions" (
    "id" TEXT NOT NULL,
    "identityId" TEXT,
    "email" BOOLEAN,
    "fcm" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_subscriptions_topics" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_subscriptions_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_hashes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL DEFAULT 'scrypt',
    "signerKey" TEXT NOT NULL,
    "saltSeparator" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "memoryCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_hashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_tenant_invites" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "teamId" TEXT,
    "token" TEXT,
    "accepted" BOOLEAN DEFAULT false,
    "lastSent" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_tenant_invites_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "y_teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_team_members" (
    "id" TEXT NOT NULL,
    "teamId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_authz_resources" (
    "id" TEXT NOT NULL,
    "role" INTEGER,
    "resources" INTEGER[],
    "actions" INTEGER[],
    "attributes" INTEGER[],
    "enabled" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_authz_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_authz_permissions" (
    "id" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "resources" INTEGER[],
    "actions" INTEGER[],
    "attributes" INTEGER[],
    "resourcesId" TEXT NOT NULL,
    "userId" TEXT,
    "teamId" TEXT,
    "memberId" TEXT,
    "enabled" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_authz_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_credentials" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_connectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_connectors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "y_user_identities_userId_key" ON "y_user_identities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "y_identy_accounts_email_key" ON "y_identy_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "y_identy_accounts_phone_key" ON "y_identy_accounts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "y_identy_accounts_uuid_key" ON "y_identy_accounts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "y_sessions_deviceId_key" ON "y_sessions"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "y_sessions_accountId_key" ON "y_sessions"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "y_subscriptions_topics_topic_key" ON "y_subscriptions_topics"("topic");

-- CreateIndex
CREATE UNIQUE INDEX "y_tenants_name_key" ON "y_tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "y_hashes_tenantId_key" ON "y_hashes"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "y_tenant_invites_email_key" ON "y_tenant_invites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "y_tenant_invites_token_key" ON "y_tenant_invites"("token");

-- CreateIndex
CREATE UNIQUE INDEX "y_teams_name_key" ON "y_teams"("name");

-- CreateIndex
CREATE INDEX "team_id_unique" ON "y_team_members"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "y_connectors_name_key" ON "y_connectors"("name");

-- AddForeignKey
ALTER TABLE "y_user_identities" ADD CONSTRAINT "y_user_identities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_identy_accounts" ADD CONSTRAINT "y_identy_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_sessions" ADD CONSTRAINT "y_sessions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "y_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_sessions" ADD CONSTRAINT "y_sessions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "y_identy_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_subscriptions" ADD CONSTRAINT "y_subscriptions_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "y_user_identities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_subscriptions_topics" ADD CONSTRAINT "y_subscriptions_topics_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "y_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenants" ADD CONSTRAINT "y_tenants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "y_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_hashes" ADD CONSTRAINT "y_hashes_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "y_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_invites" ADD CONSTRAINT "y_tenant_invites_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "y_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_tenant_invites" ADD CONSTRAINT "y_tenant_invites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_teams" ADD CONSTRAINT "y_teams_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "y_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_team_members" ADD CONSTRAINT "y_team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_team_members" ADD CONSTRAINT "y_team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "y_authz_resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "y_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "y_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "y_authz_permissions" ADD CONSTRAINT "y_authz_permissions_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "y_team_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
