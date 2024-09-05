-- AlterTable
ALTER TABLE "y_authz_permissions" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_authz_resources" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_connectors" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_credentials" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_devices" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_hashes" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_identy_accounts" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_notifications" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_sessions" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_subscriptions" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_subscriptions_topics" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_team_members" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_teams" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_tenant_invites" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_tenants" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_user_identities" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);

-- AlterTable
ALTER TABLE "y_users" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);
