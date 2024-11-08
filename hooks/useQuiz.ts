import fetcher from '@/lib/fetcher';
import { QuizType } from '@/lib/type';
import useSWR from 'swr';

const useQuiz = () => {
	const endPoint = '/api/quiz';
	const { data, error, isLoading, mutate } = useSWR<QuizType[]>(endPoint, fetcher);
	return { data, error, isLoading, mutate };
};

export default useQuiz;
