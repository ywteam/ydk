-- CreateTable
CREATE TABLE "y_groups" (
    "id" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_groups_pkey" PRIMARY KEY ("id")
);
