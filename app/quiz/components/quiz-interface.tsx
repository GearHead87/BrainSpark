'use client';
import React, { useState } from 'react';
import { QuizType } from '@/lib/type';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/shared/question-card';
import ExplanationCard from '@/components/shared/quiz-explanation-card';
import QuizProgress from '@/components/shared/quiz-progress';
import Navigation from '@/components/shared/quiz-navigation';

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
	const [scoredQuestions, setScoredQuestions] = useState(new Set());
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleAnswerSelect = (index: number) => {
		const isCorrect = quizQuestions[currentQuestion].answer === index;

		const updatedAnswers: number[] = [...selectedAnswers];
		updatedAnswers[currentQuestion] = index;
		setSelectedAnswers(updatedAnswers);

		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			setScore(score + 1);
			setScoredQuestions((prev) => new Set(prev).add(currentQuestion));
		} else if (!isCorrect && scoredQuestions.has(currentQuestion)) {
			setScore(score - 1);
			const updatedScoredQuestions = new Set(scoredQuestions);
			updatedScoredQuestions.delete(currentQuestion);
			setScoredQuestions(updatedScoredQuestions);
		}

		setShowExplanation(true);
	};

	const handleNextQuestion = () => {
		setShowExplanation(false);
		setCurrentQuestion((prev) => prev + 1);
	};

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
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			{/* Quiz Progress */}
			<QuizProgress
				currentQuestion={currentQuestion}
				totalQuestions={quizQuestions.length}
				score={score}
			/>

			{/* Question Card */}
			<QuestionCard
				currentQuestion={quizQuestions[currentQuestion]}
				selectedAnswer={selectedAnswers[currentQuestion]}
				onAnswerSelect={handleAnswerSelect}
			/>

			{/* Navigation */}
			<Navigation
				currentQuestion={currentQuestion}
				totalQuestions={quizQuestions.length}
				selectedAnswer={selectedAnswers[currentQuestion]}
				isSubmitting={isSubmitting}
				onPreviousQuestion={handlePreviousQuestion}
				onNextQuestion={handleNextQuestion}
				onSubmit={handleSubmit}
			/>

			{/* Explanation Card */}
			{showExplanation && (
				<ExplanationCard explanation={quizQuestions[currentQuestion].explanation} />
			)}
		</div>
	);
};

export default QuizInterface;
