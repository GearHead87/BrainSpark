import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ResultType } from '@/lib/type';

export async function GET(request: Request, { params }: { params: { resultId: string } }) {
	try {
		const { resultId } = params;

		const result = await prisma.result.findUnique({
			where: { id: resultId },
			include: {
				quiz: true,
				user: true,
			},
		});

		if (!result) {
			return NextResponse.json({ error: 'Result not found' }, { status: 404 });
		}

		const resultData: ResultType = {
			resultId: result.id,
			quizId: result.quizId,
			userId: result.userId,
			score: result.marks,
			totalQuestions: result.quiz.totalQuestions,
			selectedAnswers: result.selectedAnswers as number[],
			createdAt: result.createdAt,
		};

		return NextResponse.json(resultData);
	} catch (error) {
		console.error('Error fetching result:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}