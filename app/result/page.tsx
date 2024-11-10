'use client';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import useResult from '@/hooks/useResult';
import { ResultType } from '@/lib/type';
import ResultInterface from './components/result-interface';

const ResultPage = () => {
	const { data, isLoading } = useResult();

	useEffect(() => {
		if (!isLoading && data) {
			const score = (data as ResultType).score;
			const totalQuestions = (data as ResultType).totalQuestions;
			const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

			if (percentage > 70) {
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			}
		}
	}, [data, isLoading]);

	// Early return for loading state
	if (isLoading) {
		return <div>Loading.....</div>;
	}

	// Early return for missing data
	if (!data) {
		return <div>No result data available</div>;
	}

	const { score = 0, totalQuestions = 0, quizId = '', resultId = '' } = data as ResultType;
	const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

	const onRetry = () => {
		console.log(quizId);
		return;
	};
	const onShare = () => {
		console.log(resultId);
		return;
	};
	return (
		<div className="px-4">
			<ResultInterface
				score={score}
				percentage={percentage}
				totalQuestions={totalQuestions}
				onRetry={onRetry}
				onShare={onShare}
			/>
		</div>
	);
};

export default ResultPage;
