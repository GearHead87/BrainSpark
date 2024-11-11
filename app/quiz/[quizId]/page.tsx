'use client';
import useQuiz from '@/hooks/useQuiz';
import { QuizType } from '@/lib/type';
import QuizInterface from '../components/quiz-interface';
import { useParams } from 'next/navigation';

const QuizPage = () => {
	const { quizId } = useParams<{ quizId: string }>();
	const { data, isLoading, error } = useQuiz({ quizId });

	if (isLoading) {
		return <div className="text-white flex justify-center items-center">Loading...</div>;
	}

	if (error) {
		return <div className="text-white flex justify-center items-center">Error: {error}</div>;
	}

	if (typeof data === 'object' && 'error' in data) {
		return (
			<div className="text-white flex justify-center items-center">Error: {data.error}</div>
		);
	}

	const quizQuestions = data as unknown as QuizType[];

	return (
		<div className="px-4 py-8">
			<QuizInterface quizQuestions={quizQuestions} />
		</div>
	);
};

export default QuizPage;
