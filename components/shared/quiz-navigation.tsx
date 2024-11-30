'use client';
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/shared/loading-spinner';

interface NavigationProps {
	currentQuestion: number;
	totalQuestions: number;
	selectedAnswer?: number;
	isSubmitting: boolean;
	onPreviousQuestion: () => void;
	onNextQuestion: () => void;
	onSubmit: () => void;
	isReviewMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	currentQuestion,
	totalQuestions,
	selectedAnswer,
	isSubmitting,
	onPreviousQuestion,
	onNextQuestion,
	onSubmit,
	isReviewMode = false,
}) => {
	const isLastQuestion = currentQuestion === totalQuestions - 1;
	const isFirstQuestion = currentQuestion === 0;

	return (
		<div className="flex justify-between mb-8">
			<button
				className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={onPreviousQuestion}
				disabled={isFirstQuestion}
			>
				<ArrowLeft className="w-4 h-4" />
				Previous
			</button>
			{!isReviewMode && isLastQuestion ? (
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={onSubmit}
					disabled={isSubmitting || selectedAnswer === undefined}
				>
					{isSubmitting ? <LoadingSpinner /> : 'Submit'}
				</button>
			) : !isReviewMode && !isLastQuestion ? (
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={onNextQuestion}
					disabled={selectedAnswer === undefined}
				>
					Next
					<ArrowRight className="w-4 h-4" />
				</button>
			) : isReviewMode && !isLastQuestion ? (
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={onNextQuestion}
				>
					Next
					<ArrowRight className="w-4 h-4" />
				</button>
			) : null}
		</div>
	);
};

export default Navigation;
