import { ReactNode } from 'react';

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
	return (
		<div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors">
			<div className="flex flex-col items-center text-center">
				{icon}
				<h3 className="text-xl font-bold text-white mt-4 mb-2">{title}</h3>
				<p className="text-purple-200">{description}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
