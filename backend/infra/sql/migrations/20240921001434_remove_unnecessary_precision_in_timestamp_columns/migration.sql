-- AlterTable
ALTER TABLE "UserChapter" ALTER COLUMN "readAt" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "UserMovie" ALTER COLUMN "when" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "UserVideo" ALTER COLUMN "when" SET DATA TYPE TIMESTAMPTZ(0);
