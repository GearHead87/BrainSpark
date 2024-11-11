import { prisma } from '@/lib/prisma';
import { QuizType } from '@/lib/type';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ quizId: string }> }) {
	const quizId = (await params).quizId;
	console.log('quizId route.ts ->', quizId);

	try {
		const quiz = await prisma.questions.findUnique({
			where: { quizId },
		});

		let quizQuestions: QuizType[] = [];

		if (quiz?.questions) {
			quizQuestions = JSON.parse(quiz?.questions);
			return NextResponse.json(quizQuestions);
		} else {
			return NextResponse.json({ error: 'Quiz not found' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error in route.ts:', error);
		return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
}
