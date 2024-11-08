interface StateCardProps {
	number: string;
	label: string;
}

const StatCard = ({ number, label }: StateCardProps) => {
	return (
		<div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg">
			<div className="text-3xl font-bold text-white mb-2">{number}</div>
			<div className="text-purple-200">{label}</div>
		</div>
	);
};

export default StatCard;
