'use client';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
	const router = useRouter();
	router.push(`./`);

	return;
};

export default QuizPage;
