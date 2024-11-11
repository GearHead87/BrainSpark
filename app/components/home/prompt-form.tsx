'use client';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getCsrfToken } from 'next-auth/react';
import { Send } from 'lucide-react';
import LoadingSpinner from '../../../components/shared/loading-spinner';

const formSchema = z.object({
	prompt: z.string().min(10, { message: 'Prompt Must be at least 10 characters.' }),
});
type formSchemaProps = z.infer<typeof formSchema>;

const PromptForm = () => {
	const router = useRouter();
	const [csrfToken, setCsrfToken] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function loadProviders() {
			const csrf = await getCsrfToken();
			setCsrfToken(csrf);
		}
		loadProviders();
	}, []);

	const form = useForm<formSchemaProps>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data: formSchemaProps) => {
		setLoading(true);
		try {
			const response = await fetch('/api/quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const { quizId } = await response.json();
			setLoading(false);
			router.push(`/quiz/${quizId}`);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="relative">
				<input type="hidden" name="csrfToken" value={csrfToken} />
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							<Input
								type="text"
								style={{ fontSize: '16px' }}
								className="relative bg-white/20 backdrop-blur-lg transition-colors p-6 rounded-3xl shadow-md w-full text-white placeholder:text-white placeholder:text-base"
								placeholder="Enter a topic..."
								{...field}
								disabled={loading}
							/>
							<button
								className="absolute right-5 -top-1 rounded-full transition-colors bg-white/20 p-2"
								type="submit"
								disabled={loading}
							>
								{loading ? <LoadingSpinner /> : <Send className="text-white" />}
								{/* <LoadingSpinner /> */}
							</button>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default PromptForm;
