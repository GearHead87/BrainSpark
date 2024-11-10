import fetcher from '@/lib/fetcher';
import { ResultType } from '@/lib/type';
import useSWR from 'swr';

const useResult = () => {
	const endPoint = '/api/result';
	const { data, error, isLoading, mutate } = useSWR<ResultType>(endPoint, fetcher);
	return { data, error, isLoading, mutate };
};

export default useResult;
