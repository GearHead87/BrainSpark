'use client';
import useQuiz from '@/hooks/useQuiz';
import { QuizType } from '@/lib/type';
import QuizInterface from '../components/quiz-interface';

const QuizPage = () => {
	const { data, isLoading } = useQuiz();

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
