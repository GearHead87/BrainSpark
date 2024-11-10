'use client';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	prompt: z.string().min(10, { message: 'Prompt Must be at least 10 characters.' }),
});
type formSchemaProps = z.infer<typeof formSchema>;

const PromptForm = () => {
	const router = useRouter();
	const form = useForm<formSchemaProps>({
		resolver: zodResolver(formSchema),
	});
	const onSubmit = async (data: formSchemaProps) => {
		try {
			const response = await fetch('/api/quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const { quizID } = await response.json();
			router.push(`/quiz/${quizID}`);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							<Input
								className="relative bg-white/20 backdrop-blur-lg transition-colors p-6 rounded-xl shadow-md w-full text-white placeholder:text-white"
								placeholder="Enter a topic..."
								{...field}
							/>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default PromptForm;
