import fetcher from '@/lib/fetcher';
import { QuizType } from '@/lib/type';
import useSWR from 'swr';

interface UseQuizProps {
	quizId: string;
}
interface UseQuizResponse {
	data: QuizType[] | { error: string };
	isLoading: boolean;
	error: string | undefined;
}

const useQuiz = ({ quizId }: UseQuizProps): UseQuizResponse => {
	const endPoint = `/api/quiz/${quizId}`;
	const { data, error, isLoading } = useSWR<QuizType[]>(endPoint, fetcher);
	return { data: data || { error: 'Quiz not found' }, error: error?.message, isLoading };
};

export default useQuiz;
