/*
  Warnings:

  - Added the required column `updatedAt` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalQuestions` on the `Questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "totalQuestions",
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "selectedAnswers" JSONB NOT NULL,
    "marks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Result_userId_idx" ON "Result"("userId");

-- CreateIndex
CREATE INDEX "Result_quizId_idx" ON "Result"("quizId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "user_results" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "quiz_results" FOREIGN KEY ("quizId") REFERENCES "Questions"("quizId") ON DELETE CASCADE ON UPDATE CASCADE;
