'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface QuizProgressProps {
	currentQuestion: number;
	totalQuestions: number;
	score: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentQuestion, totalQuestions, score }) => {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-2">
				<div className="text-white font-bold">
					Question {currentQuestion + 1}/{totalQuestions}
				</div>
				<div className="text-purple-200">Score: {score}</div>
			</div>
			<div className="w-full h-2 bg-white/20 rounded-full">
				<motion.div
					className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
					initial={{ width: '0%' }}
					animate={{
						width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
					}}
					transition={{ duration: 0.5 }}
				/>
			</div>
		</div>
	);
};

export default QuizProgress;
