import fetcher from '@/lib/fetcher';
import { QuizType } from '@/lib/type';
import useSWR from 'swr';

interface UseQuizProps {
	quizId: string;
}
const useQuiz = ({ quizId }: UseQuizProps) => {
	const endPoint = `/api/quiz/${quizId}`;
	const { data, error, isLoading, mutate } = useSWR<QuizType[]>(endPoint, fetcher);
	return { data, error, isLoading, mutate };
};

export default useQuiz;
