'use client'
import { useLogin } from '@/components/auth/useLogin'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage: React.FC = () => {
	const router = useRouter()

	const [email, setEmail] = useState('yoan@gmail.com')
	const [password, setPassword] = useState('mdp123')

	const login = async (mail: string, password: string) => {
		await useLogin().login(mail, password)
		router.push('/films')
	}

	return (
		<Flex justify={'center'} align={'center'} h={'100vh'} flexDir={'column'}>
			<Text fontSize={'xxx-large'}>Bienvenue sur le Backoffice</Text>
			<Box mx="auto" mt={8} p={4}>
				<VStack spacing={4}>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
					</FormControl>
					<Button
						colorScheme="blue"
						size="lg"
						width="full"
						onClick={() => {
							login(email, password)
						}}
					>
						Sign In
					</Button>
				</VStack>
			</Box>
		</Flex>
	)
}

export default LoginPage
