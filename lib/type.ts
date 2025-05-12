export interface QuizType {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}
export interface ResultType {
	resultId: string;
	quizId: string;
	userId: string;
	score: number;
	totalQuestions: number;
	selectedAnswers: number[];
	questions: QuizQuestionType[];
	createdAt?: Date;
}

export interface QuizQuestionType {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}
