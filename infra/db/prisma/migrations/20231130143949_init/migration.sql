-- AlterTable
ALTER TABLE "y_tests" ALTER COLUMN "createdBy" SET DEFAULT current_setting('app.current_user_id'::text, true),
ALTER COLUMN "updatedBy" SET DEFAULT current_setting('app.current_user_id'::text, true);
