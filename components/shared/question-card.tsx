'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { QuizType } from '@/lib/type';

interface QuestionCardProps {
    currentQuestion: QuizType;
    selectedAnswer?: number;
    onAnswerSelect: (index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
    currentQuestion, 
    selectedAnswer, 
    onAnswerSelect 
}) => {
    return (
        <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">
                    {currentQuestion.question}
                </h2>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4 mb-6">
                {currentQuestion.options.map((option, index) => (
                    <motion.button
                        key={index}
                        className={`p-4 rounded-lg text-left transition-colors ${
                            selectedAnswer === index
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/5 text-purple-200 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAnswerSelect(index)}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionCard;