'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizType } from '@/lib/type';
import QuestionCard from '@/components/shared/question-card';
import ExplanationCard from '@/components/shared/quiz-explanation-card';
import Navigation from '@/components/shared/quiz-navigation';

interface DetailedResultViewProps {
	questions: QuizType[];
	selectedAnswers: number[];
}

const DetailedResultView: React.FC<DetailedResultViewProps> = ({ questions, selectedAnswers }) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const handleNextQuestion = () => {
		setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestion((prev) => Math.max(prev - 1, 0));
	};

	const isCorrectAnswer = (questionIndex: number) => {
		return selectedAnswers[questionIndex] === questions[questionIndex].answer;
	};

	return (
		<motion.div
			className="max-w-2xl mx-auto mt-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<h2 className="text-2xl font-bold text-white mb-6 text-center">Detailed Quiz Review</h2>

			{/* Question Status */}
			<div className="mb-6 flex justify-center space-x-4">
				{questions.map((_, index) => (
					<div
						key={index}
						className={`w-4 h-4 rounded-full ${
							isCorrectAnswer(index) ? 'bg-green-500' : 'bg-red-500'
						}`}
					/>
				))}
			</div>

			{/* Question Card with Selected and Correct Answer */}
			<div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
				<div className="mb-4">
					<h3 className="text-xl font-bold text-white mb-2">
						Question {currentQuestion + 1}
					</h3>
					<div className="flex items-center space-x-2 mb-4">
						<span
							className={`px-2 py-1 rounded text-sm font-bold ${
								isCorrectAnswer(currentQuestion)
									? 'bg-green-500/20 text-green-300'
									: 'bg-red-500/20 text-red-300'
							}`}
						>
							{isCorrectAnswer(currentQuestion) ? 'Correct' : 'Incorrect'}
						</span>
					</div>
				</div>

				<QuestionCard
					currentQuestion={questions[currentQuestion]}
					selectedAnswer={selectedAnswers[currentQuestion]}
					isReviewMode={true}
					correctAnswer={questions[currentQuestion].answer}
					onAnswerSelect={() => {}} // Disabled in review mode
				/>
			</div>

			{/* Explanation Card */}
			<ExplanationCard explanation={questions[currentQuestion].explanation} />

			{/* Navigation */}
			<Navigation
				currentQuestion={currentQuestion}
				totalQuestions={questions.length}
				selectedAnswer={0} // Always enabled in review mode
				isSubmitting={false}
				onPreviousQuestion={handlePreviousQuestion}
				onNextQuestion={handleNextQuestion}
				onSubmit={() => {}} // No submit in review mode
				isReviewMode={true}
			/>
		</motion.div>
	);
};

export default DetailedResultView;
