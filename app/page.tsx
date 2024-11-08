import { auth } from '@/lib/auth';
import Home from './components/home';

export default async function HomePage() {
	const session = await auth();
	console.log(session);
	return (
		<div>
			<Home />
		</div>
	);
}
