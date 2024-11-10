import React from 'react';
import { Zap, Target, Clock } from 'lucide-react';
import FeatureCard from './feature-card';
import StatCard from './state-card';
import Logo from '@/components/shared/logo';
import LoginButton from '../../../components/shared/login-button';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import PromptForm from './prompt-form';

const Home = async () => {
	const session = await auth();
	return (
		<div className="px-4 py-16">
			<div className="flex flex-col items-center text-center mb-16">
				<div className="flex items-center gap-2 mb-4">
					<Logo />
				</div>
				<p className="text-xl text-purple-200 mb-8">
					Ignite your curiosity, illuminate your mind
				</p>
				<div className={`relative ${session && 'w-full max-w-md'}`}>
					<div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur"></div>
					{session ? (
						<PromptForm />
					) : (
						<LoginButton>
							<Button variant="spark">Start Your Journey</Button>
						</LoginButton>
					)}
				</div>
			</div>

			{/* Features Grid */}
			<div className="grid md:grid-cols-3 gap-8 mb-16">
				<FeatureCard
					icon={<Zap className="w-8 h-8 text-yellow-400" />}
					title="AI-Powered Questions"
					description="Dynamic quizzes generated in real-time based on your chosen topic"
				/>
				<FeatureCard
					icon={<Target className="w-8 h-8 text-green-400" />}
					title="Adaptive Learning"
					description="Questions adjust to your knowledge level as you progress"
				/>
				<FeatureCard
					icon={<Clock className="w-8 h-8 text-blue-400" />}
					title="Instant Generation"
					description="Create comprehensive quizzes in seconds on any topic"
				/>
			</div>

			{/* Stats Section */}
			<div className="grid md:grid-cols-3 gap-8 text-center">
				<StatCard number="1000+" label="Topics Available" />
				<StatCard number="50K+" label="Questions Generated" />
				<StatCard number="10K+" label="Happy Learners" />
			</div>
		</div>
	);
};

export default Home;
