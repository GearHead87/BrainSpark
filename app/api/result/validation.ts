import { z } from "zod";

export const resultSchema = z.object({
  selectedAnswers: z.array(z.number()).min(1, "At least one answer is required"),
  totalQuestions: z.number().positive("Total questions must be positive"),
  marks: z.number().int("Marks must be an integer").min(0, "Marks cannot be negative"),
  quizId: z.string().cuid("Invalid quiz ID format"),
});

export type ResultSchemaType = z.infer<typeof resultSchema>;