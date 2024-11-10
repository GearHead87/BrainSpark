import { ResultType } from '@/lib/type';
import { NextResponse } from 'next/server';

const result: ResultType = {
	quizId: 'asdfasdf',
	resultId: 'asdfaosf',
	score: 8,
	totalQuestions: 10,
};

export async function GET() {
	return NextResponse.json(result);
}
