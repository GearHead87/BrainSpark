// 'use client';

import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
	children: ReactNode;
}

const AuthProvider = async ({ children }: ProviderProps) => {
	const session = await auth();
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default AuthProvider;
