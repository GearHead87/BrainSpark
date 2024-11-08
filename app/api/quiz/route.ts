// app/api/quiz/route.ts
import { NextResponse } from 'next/server';

const quizQuestions = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
		answer: 0,
		explanation: "Paris is the capital and largest city of France, known for its influence in art, culture, and fashion."
	},
	{
		question: "Which planet is known as the Red Planet?",
		options: ["Earth", "Mars", "Jupiter", "Saturn"],
		answer: 1,
		explanation: "Mars is often called the Red Planet because of its reddish appearance caused by iron oxide on its surface."
	},
	{
		question: "What is the largest mammal on Earth?",
		options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
		answer: 1,
		explanation: "The Blue Whale is the largest mammal, reaching lengths up to 100 feet and weighing up to 200 tons."
	},
	{
		question: "Who wrote 'Romeo and Juliet'?",
		options: ["Mark Twain", "Jane Austen", "William Shakespeare", "Charles Dickens"],
		answer: 2,
		explanation: "William Shakespeare wrote 'Romeo and Juliet', one of his most famous plays, in the late 16th century."
	},
	{
		question: "What is the boiling point of water?",
		options: ["50°C", "100°C", "0°C", "200°C"],
		answer: 1,
		explanation: "Water boils at 100°C at sea level."
	},
	{
		question: "Who painted the Mona Lisa?",
		options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
		answer: 1,
		explanation: "Leonardo da Vinci painted the Mona Lisa, a famous portrait housed in the Louvre Museum in Paris."
	},
	{
		question: "What is the powerhouse of the cell?",
		options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
		answer: 1,
		explanation: "Mitochondria are known as the powerhouse of the cell because they produce energy through respiration."
	},
	{
		question: "What is the smallest prime number?",
		options: ["0", "1", "2", "3"],
		answer: 2,
		explanation: "The smallest prime number is 2, which is also the only even prime number."
	},
	{
		question: "Who discovered gravity?",
		options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
		answer: 1,
		explanation: "Sir Isaac Newton is credited with discovering gravity after observing an apple fall from a tree."
	},
	{
		question: "Which language is primarily spoken in Brazil?",
		options: ["Spanish", "English", "Portuguese", "French"],
		answer: 2,
		explanation: "Portuguese is the official and most widely spoken language in Brazil."
	}
];

export async function GET() {
	return NextResponse.json(quizQuestions);
}
