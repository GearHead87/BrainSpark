'use client';
import React, { useEffect } from 'react';
import { Trophy, Share2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import useResult from '@/hooks/useResult';
import { ResultType } from '@/lib/type';

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
			<motion.div
				className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-400" />

				<h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
				<p className="text-purple-200 mb-8">You&apos;ve reached new heights of knowledge</p>

				<div className="relative mb-8">
					<div className="w-48 h-48 mx-auto relative">
						<svg className="w-full h-full" viewBox="0 0 100 100">
							<circle
								className="text-white/10"
								strokeWidth="8"
								stroke="currentColor"
								fill="transparent"
								r="44"
								cx="50"
								cy="50"
							/>
							<circle
								className="text-purple-400"
								strokeWidth="8"
								stroke="currentColor"
								fill="transparent"
								r="44"
								cx="50"
								cy="50"
								strokeDasharray={`${(2 * Math.PI * 44 * percentage) / 100} ${
									2 * Math.PI * 44
								}`}
								transform="rotate(-90 50 50)"
							/>
						</svg>
						<div className="absolute inset-0 flex items-center justify-center">
							<div>
								<div className="text-4xl font-bold text-white">{percentage}%</div>
								<div className="text-purple-200">Score</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-8">
					<div className="p-4 rounded-lg bg-white/5">
						<div className="text-2xl font-bold text-white">{score}</div>
						<div className="text-purple-200">Correct Answers</div>
					</div>
					<div className="p-4 rounded-lg bg-white/5">
						<div className="text-2xl font-bold text-white">
							{totalQuestions - score}
						</div>
						<div className="text-purple-200">Incorrect Answers</div>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
						onClick={onRetry}
					>
						<RotateCcw className="w-5 h-5" />
						Try Again
					</button>
					<button
						className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
						onClick={onShare}
					>
						<Share2 className="w-5 h-5" />
						Share Result
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default ResultPage;
