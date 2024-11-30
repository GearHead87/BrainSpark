'use client';
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/shared/loading-spinner';

interface NavigationProps {
    currentQuestion: number;
    totalQuestions: number;
    selectedAnswer?: number;
    isSubmitting: boolean;
    onPreviousQuestion: () => void;
    onNextQuestion: () => void;
    onSubmit: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    isSubmitting,
    onPreviousQuestion,
    onNextQuestion,
    onSubmit
}) => {
    return (
        <div className="flex justify-between">
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={onPreviousQuestion}
                disabled={currentQuestion === 0}
            >
                <ArrowLeft className="w-4 h-4" />
                Previous
            </button>
            {currentQuestion === totalQuestions - 1 ? (
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                    onClick={onSubmit}
                    disabled={
                        isSubmitting || selectedAnswer === undefined
                    }
                >
                    {isSubmitting ? <LoadingSpinner /> : 'Submit'}
                </button>
            ) : (
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                    onClick={onNextQuestion}
                    disabled={selectedAnswer === undefined}
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default Navigation;