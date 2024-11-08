'use client';
// import { Button } from '@/components/ui/button';
import { login } from '@/lib/actions';
import React, { ReactNode } from 'react';

const LoginButton = ({ children }: { children: ReactNode }) => {
	return <div onClick={() => login('google')}>{children}</div>;
};

export default LoginButton;
