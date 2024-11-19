import { Brain, Sparkles } from 'lucide-react';
import React from 'react';

interface LogoProps {
	hidden?: boolean;
}
const Logo = ({ hidden }: LogoProps) => {
	return (
		<div className={`flex justify-center items-center ${hidden ? 'invisible' : 'visible'}`}>
			<Brain className="w-12 h-12 text-purple-400" />
			<h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
				BrainSpark
			</h1>
			<Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
		</div>
	);
};

export default Logo;
