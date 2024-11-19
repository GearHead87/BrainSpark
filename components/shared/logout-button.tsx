'use client';
import { logout } from '@/lib/actions';
import React, { ReactNode } from 'react';

const LogoutButton = ({ children }: { children: ReactNode }) => {
	return <div onClick={() => logout()}>{children}</div>;
};

export default LogoutButton;
