'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface ExplanationCardProps {
	explanation: string;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
	return (
		<motion.div
			className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<div className="flex items-center gap-2 mb-4">
				<Lightbulb className="w-6 h-6 text-yellow-400" />
				<h3 className="text-lg font-bold text-white">Explanation</h3>
			</div>
			<p className="text-purple-200">{explanation}</p>
		</motion.div>
	);
};

export default ExplanationCard;
