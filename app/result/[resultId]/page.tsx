'use client';
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import useResult from '@/hooks/useResult';
import { ResultType } from '@/lib/type';
import ResultInterface from '../components/result-interface';

const ResultPage = () => {
	const router = useRouter();
	const { resultId } = useParams();
	const { data, isLoading } = useResult({ resultId: resultId as string });

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

	const { score = 0, totalQuestions = 0, quizId = '' } = data as ResultType;
	const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

	const onRetry = () => {
		router.push(`/quiz/${quizId}`);
		return;
	};
	const onShare = () => {
		if (navigator.share) {
			navigator.share({
				title: 'Quiz Result',
				text: `I scored ${score} out of ${totalQuestions} (${percentage.toFixed(
					2
				)}%) on this quiz!`,
			});
		} else {
			// Fallback for browsers not supporting Web Share API
			alert('Share functionality not supported');
		}
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
