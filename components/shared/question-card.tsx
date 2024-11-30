'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { QuizType } from '@/lib/type';

interface QuestionCardProps {
	currentQuestion: QuizType;
	selectedAnswer?: number;
	onAnswerSelect: (index: number) => void;
	isReviewMode?: boolean;
	correctAnswer?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	currentQuestion,
	selectedAnswer,
	onAnswerSelect,
	isReviewMode = false,
	correctAnswer,
}) => {
	const getButtonClassName = (index: number) => {
		if (!isReviewMode) {
			return `p-4 rounded-lg text-left transition-colors ${
				selectedAnswer === index
					? 'bg-purple-500 text-white'
					: 'bg-white/5 text-purple-200 hover:bg-white/10'
			}`;
		}

		// Review mode styling
		if (index === correctAnswer) {
			return 'p-4 rounded-lg text-left bg-green-500/20 text-green-300 border-2 border-green-500';
		}

		if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
			return 'p-4 rounded-lg text-left bg-red-500/20 text-red-300 border-2 border-red-500';
		}

		return 'p-4 rounded-lg text-left bg-white/5 text-purple-200';
	};

	return (
		<motion.div
			className="bg-white/10 backdrop-blur-lg rounded-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<div className="flex items-center gap-2 mb-4 p-6 pb-0">
				<Brain className="w-6 h-6 text-purple-400" />
				<h2 className="text-xl font-bold text-white">{currentQuestion.question}</h2>
			</div>

			{/* Answer Options */}
			<div className="grid gap-4 p-6 pt-0">
				{currentQuestion.options.map((option, index) => (
					<motion.button
						key={index}
						className={getButtonClassName(index)}
						whileHover={!isReviewMode ? { scale: 1.02 } : undefined}
						whileTap={!isReviewMode ? { scale: 0.98 } : undefined}
						onClick={!isReviewMode ? () => onAnswerSelect(index) : undefined}
						disabled={isReviewMode}
					>
						{option}
					</motion.button>
				))}
			</div>
		</motion.div>
	);
};

export default QuestionCard;
