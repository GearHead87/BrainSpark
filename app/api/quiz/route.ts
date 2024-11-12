export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';

// Define types for better type safety
interface QuizQuestion {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}

interface QuizResponse {
	quizQuestions: QuizQuestion[];
}

// interface ErrorResponse {
// 	error: string;
// }

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const prompt = body.prompt;

		if (!prompt) {
			return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
		}

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }); // Changed to gemini-1.5-pro

		const generationConfig = {
			temperature: 0.9,
			topK: 32,
			topP: 0.95,
			maxOutputTokens: 2048,
		};

		const safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		];

		const fullPrompt = `Create 10 quiz questions about: ${prompt}

Each question must have:
- A clear question
- Exactly 4 options
- The correct answer index (0-3)
- A brief explanation

Response must be in this exact JSON format:
{
  "quizQuestions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": number,
      "explanation": "string"
    }
  ]
}`;

		const result = await model.generateContent({
			contents: [
				{
					role: 'user',
					parts: [{ text: fullPrompt }],
				},
			],
			generationConfig,
			safetySettings,
		});

		const response = result.response;
		const genQuiz = response
			.text()
			.replace(/```json/g, '')
			.replace(/```/g, '');

		// Parse and validate the response
		const parsedQuiz: QuizResponse = JSON.parse(genQuiz);

		// Validate number of questions
		if (!parsedQuiz.quizQuestions || parsedQuiz.quizQuestions.length !== 10) {
			throw new Error('Invalid number of questions generated');
		}

		// Validate each question
		parsedQuiz.quizQuestions.forEach((question, index) => {
			if (
				!question.question ||
				!Array.isArray(question.options) ||
				question.options.length !== 4 ||
				typeof question.answer !== 'number' ||
				question.answer < 0 ||
				question.answer > 3 ||
				!question.explanation
			) {
				throw new Error(`Invalid question format at index ${index}`);
			}
		});

		// const quizId = crypto.randomUUID();

		const quiz = await prisma.questions.create({
			data: {
				totalQuestions: 10,
				questions: JSON.stringify(parsedQuiz.quizQuestions),
			},
		});

		return NextResponse.json(
			{
				quizId: quiz.quizId,
				success: true,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Quiz generation error:', error);
		return NextResponse.json(
			{
				error: 'Failed to generate quiz. Please try again.',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
