// api/result/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { resultSchema, ResultSchemaType } from './validation';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json(
				{
					success: false,
					error: 'Unauthorized access',
					details: 'User must be logged in to submit quiz results',
				},
				{ status: 401 }
			);
		}
		console.log(session);

		const body = await request.json();

		// Validate request body against schema
		const validatedData: ResultSchemaType = resultSchema.parse(body);

		// Verify quiz exists
		const quiz = await prisma.questions.findUnique({
			where: {
				quizId: validatedData.quizId,
			},
		});

		if (!quiz) {
			return NextResponse.json(
				{
					success: false,
					error: 'Quiz not found',
					details: 'The specified quiz does not exist',
				},
				{ status: 404 }
			);
		}

		// Verify answers length matches total questions
		if (validatedData.selectedAnswers.length !== quiz.totalQuestions) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid submission',
					details: 'Number of answers does not match total questions',
				},
				{ status: 400 }
			);
		}

		// Create new result in database
		const result = await prisma.result.create({
			data: {
				userId: session.user.id,
				quizId: validatedData.quizId,
				selectedAnswers: validatedData.selectedAnswers,
				marks: validatedData.marks,
			},
		});

		return NextResponse.json(
			{
				success: true,
				resultId: result.id,
				message: 'Quiz result saved successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		// Handle Zod validation errors
		if (error instanceof ZodError) {
			return NextResponse.json(
				{
					success: false,
					error: 'Validation error',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 }
			);
		}

		// Handle other errors
		console.error('Error processing quiz result:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				details: 'An unexpected error occurred while processing your request',
			},
			{ status: 500 }
		);
	}
}
