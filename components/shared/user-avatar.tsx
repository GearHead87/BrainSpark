import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface UserAvatarProps {
	url: string | null | undefined;
	className?: string;
}

const UserAvatar = ({ url, className }: UserAvatarProps) => {
	return (
		<div className={cn('rounded-full w-14 h-14', className)}>
			<Image
				src={url ? url : 'https://i.ibb.co.com/gM25kPY/Rectangle-23909.png'}
				alt="UserAvatar"
				width={50}
				height={50}
				className="rounded-full"
			/>
		</div>
	);
};

export default UserAvatar;
