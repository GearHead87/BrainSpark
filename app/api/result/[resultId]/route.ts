import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ResultType } from '@/lib/type';

export async function GET(request: Request, { params }: { params: Promise<{ resultId: string }> }) {
	try {
		const resultId = (await params).resultId;

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

		const parsedQuestions = JSON.parse(result.quiz.questions);

		const resultData: ResultType = {
			resultId: result.id,
			quizId: result.quizId,
			userId: result.userId,
			score: result.marks,
			totalQuestions: result.quiz.totalQuestions,
			selectedAnswers: result.selectedAnswers as number[],
			questions: parsedQuestions,
			createdAt: result.createdAt,
		};

		return NextResponse.json(resultData);
	} catch (error) {
		console.error('Error fetching result:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
