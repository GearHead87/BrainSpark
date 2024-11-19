export interface QuizType {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}

export interface ResultType {
	quizId: string;
	totalQuestions: number;
	score: number;
	resultId: string;
}


export interface QuizQuestionType {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}
