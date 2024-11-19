import fetcher from '@/lib/fetcher';
import { ResultType } from '@/lib/type';
import useSWR from 'swr';

interface UseResultProps {
    resultId: string;
}

const useResult = ({ resultId }: UseResultProps) => {
    const endpoint = `/api/result/${resultId}`;
    const { data, error, isLoading, mutate } = useSWR<ResultType>(endpoint, fetcher);
    return { data, error, isLoading, mutate };
};

export default useResult;
