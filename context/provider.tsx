import React from 'react';
import { ThemeProvider } from './theme-provider';
import AuthProvider from './auth-context';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</AuthProvider>
	);
};

export default Providers;
