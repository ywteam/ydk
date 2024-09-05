-- CreateTable
CREATE TABLE "y_banned" (
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

    CONSTRAINT "y_banned_pkey" PRIMARY KEY ("id")
);
