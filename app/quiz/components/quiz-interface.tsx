'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuizType } from '@/lib/type';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/shared/loading-spinner';

interface QuizInterfaceProps {
	quizQuestions: QuizType[];
	quizId: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quizQuestions, quizId }) => {
	const router = useRouter();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
	const [score, setScore] = useState(0);
	const [showExplanation, setShowExplanation] = useState(false);
	const [scoredQuestions, setScoredQuestions] = useState(new Set()); // Track questions scored
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Handle answer selection
	const handleAnswerSelect = (index: number) => {
		const isCorrect = quizQuestions[currentQuestion].answer === index;

		// Update selected answers for current question
		const updatedAnswers: number[] = [...selectedAnswers];
		updatedAnswers[currentQuestion] = index;
		setSelectedAnswers(updatedAnswers);

		// Update score only if the answer is correct and hasn't been scored before
		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			setScore(score + 1);
			setScoredQuestions((prev) => new Set(prev).add(currentQuestion)); // Mark question as scored
		} else if (!isCorrect && scoredQuestions.has(currentQuestion)) {
			setScore(score - 1);
			const updatedScoredQuestions = new Set(scoredQuestions);
			updatedScoredQuestions.delete(currentQuestion);
			setScoredQuestions(updatedScoredQuestions);
		}

		setShowExplanation(true);
	};

	// Handle navigation to the next question
	const handleNextQuestion = () => {
		setShowExplanation(false);
		setCurrentQuestion((prev) => prev + 1);
	};

	// Handle navigation to the previous question
	const handlePreviousQuestion = () => {
		setShowExplanation(false);
		setCurrentQuestion((prev) => prev - 1);
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			const response = await fetch('/api/result', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					selectedAnswers,
					totalQuestions: quizQuestions.length,
					marks: score,
					quizId,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 401) {
					// Handle unauthorized - maybe redirect to login
					router.push('/');
					return;
				}

				throw new Error(data.error || 'Failed to save quiz results');
			}

			if (data.success && data.resultId) {
				router.push(`/result/${data.resultId}`);
			} else {
				throw new Error('Failed to save quiz results');
			}
		} catch (error) {
			console.error('Error submitting quiz:', error);
			// You might want to show an error message to the user here
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			{/* Quiz Progress */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-2">
					<div className="text-white font-bold">
						Question {currentQuestion + 1}/{quizQuestions.length}
					</div>
					<div className="text-purple-200">Score: {score}</div>
				</div>
				<div className="w-full h-2 bg-white/20 rounded-full">
					<motion.div
						className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
						initial={{ width: '0%' }}
						animate={{
							width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
						}}
						transition={{ duration: 0.5 }}
					/>
				</div>
			</div>

			{/* Question Card */}
			<motion.div
				className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex items-center gap-2 mb-4">
					<Brain className="w-6 h-6 text-purple-400" />
					<h2 className="text-xl font-bold text-white">
						{quizQuestions[currentQuestion].question}
					</h2>
				</div>

				{/* Answer Options */}
				<div className="grid gap-4 mb-6">
					{quizQuestions[currentQuestion].options.map((option, index) => (
						<motion.button
							key={index}
							className={`p-4 rounded-lg text-left transition-colors ${
								selectedAnswers[currentQuestion] === index
									? 'bg-purple-500 text-white'
									: 'bg-white/5 text-purple-200 hover:bg-white/10'
							}`}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => handleAnswerSelect(index)}
						>
							{option}
						</motion.button>
					))}
				</div>

				{/* Navigation */}
				<div className="flex justify-between">
					<button
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
						onClick={handlePreviousQuestion}
						disabled={currentQuestion === 0}
					>
						<ArrowLeft className="w-4 h-4" />
						Previous
					</button>
					{currentQuestion === quizQuestions.length - 1 ? (
						<button
							className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
							onClick={handleSubmit}
							disabled={isSubmitting}
						>
							{isSubmitting ? <LoadingSpinner /> : 'Submit'}
						</button>
					) : (
						<button
							className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
							onClick={handleNextQuestion}
						>
							Next
							<ArrowRight className="w-4 h-4" />
						</button>
					)}
				</div>
			</motion.div>

			{/* Explanation Card */}
			{showExplanation && (
				<motion.div
					className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="flex items-center gap-2 mb-4">
						<Lightbulb className="w-6 h-6 text-yellow-400" />
						<h3 className="text-lg font-bold text-white">Explanation</h3>
					</div>
					<p className="text-purple-200">{quizQuestions[currentQuestion].explanation}</p>
				</motion.div>
			)}
		</div>
	);
};

export default QuizInterface;
