'use client';
import useQuiz from '@/hooks/useQuiz';
import { QuizType } from '@/lib/type';
import QuizInterface from '../components/quiz-interface';
import { useParams } from 'next/navigation';

const QuizPage = () => {
	const { quizId } = useParams<{ quizId: string }>();
	const { data, isLoading } = useQuiz({ quizId });
	console.log(quizId);
	const quizQuestions = data as unknown as QuizType[];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="px-4 py-8">
			<QuizInterface quizQuestions={quizQuestions} />
		</div>
	);
};

export default QuizPage;
