'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
	const theme = extendTheme({
		colors: {
			primary: {
				100: '#b59eda',
				200: '#a98ed4',
				300: '#9d7ece',
				400: '#906ec8',
				500: '#845ec2',
				600: '#7755af',
				700: '#6a4b9b',
				800: '#5c4288',
				900: '#4f3874',
			},
			secondary: {
				100: '#ffa9bd',
				200: '#ff9ab2',
				300: '#ff8ca7',
				400: '#ff7d9c',
				500: '#ff6f91',
				600: '#e66483',
				700: '#cc5974',
				800: '#b34e66',
				900: '#994357',
			},
			tertiary: {
				100: '#ffdd9f',
				200: '#ffd88f',
				300: '#ffd27f',
				400: '#ffcd6f',
				500: '#ffc75f',
				600: '#e6b356',
				700: '#cc9f4c',
				800: '#b38b43',
				900: '#997739',
			},
		},
	})

	const queryClient = new QueryClient()

	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ChakraProvider>
	)
}
