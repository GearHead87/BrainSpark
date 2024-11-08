import Logo from '@/components/shared/logo';
import React from 'react';
import MoreOptions from './more-options';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const SiteHeader = async () => {
	// const pathName =
	const headersList = await headers();
	// read the custom x-url header
	const header_url = new URL(headersList.get('x-url') || '');
	const pathParts = header_url.pathname.split('/');
	const pathname = pathParts[1];
	const session = await auth();
	console.log(pathname, pathParts);

	if (!session) {
		return null;
	}
	return (
		<header className="relative z-50 mb-2 w-full">
			<div className="flex items-center justify-between">
				{<Logo hidden={pathname ? false : true} />}
				<MoreOptions />
			</div>
		</header>
	);
};

export default SiteHeader;
