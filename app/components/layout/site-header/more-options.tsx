import React from 'react';
import UserAvatar from '@/components/shared/user-avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User2 } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import LogoutButton from '@/components/shared/logout-button';

const links = [
	{
		label: 'User Profile',
		href: '/profile',
		icon: User2,
	},
];

const MoreOptions = async () => {
	const session = await auth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{/* <Button variant="ghost" size="sm" className=" rounded-full"> */}
				<UserAvatar url={session?.user?.image} className="border-[5px] border-white" />
				{/* </Button> */}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					{links.map((link) => (
						<Link href={link.href} key={link.label}>
							<DropdownMenuItem>
								<link.icon className="mr-2 h-4 w-4" aria-label={link.label} />
								<p>{link.label}</p>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<LogoutButton>
					<DropdownMenuItem>
						<LogOut className="mr-2 h-4 w-4" aria-label="logout" />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MoreOptions;
