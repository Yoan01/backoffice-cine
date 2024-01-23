'use client'
import { usePathname } from 'next/navigation'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/Header'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const pathname = usePathname()

	const isLoginPage = pathname === '/login'

	return (
		<html lang="fr">
			<body>
				<Providers>
					{!isLoginPage && <Header />}
					{children}
				</Providers>
			</body>
		</html>
	)
}
