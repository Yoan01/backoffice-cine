'use client'
import React, { use } from 'react'
import {
	Avatar,
	Box,
	Flex,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useLogout } from './auth/useLogout'
import { useRouter } from 'next/navigation'
import { useUser } from './auth/useUser'
import { IUserInfo } from '@/interface/IUserInfo'

export const Header: React.FC = () => {
	const router = useRouter()
	const user: IUserInfo | null = useUser()

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			p={4}
			bg="blueviolet"
			color="white"
		>
			<Box>
				<Text fontSize="xl" fontWeight="bold">
					Mon Site
				</Text>
			</Box>
			<Box>
				<Link as={NextLink} href="/films" mr={4}>
					Films
				</Link>
				<Link as={NextLink} href="/series" mr={4}>
					Séries
				</Link>
				<Link as={NextLink} href="/seances">
					Séances
				</Link>
			</Box>
			<Box>
				<Menu>
					<MenuButton>
						<Avatar size="md" name="user?.email" />
					</MenuButton>
					<MenuList>
						<MenuItem
							color={'black'}
							onClick={() => {
								useLogout().logout()
								router.push('/login')
							}}
						>
							Se déconnecter
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
		</Flex>
	)
}
