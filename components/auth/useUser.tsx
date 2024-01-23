import { use, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { IUserInfo } from '@/interface/IUserInfo'

export const useUser = () => {
	const [user, setUser] = useState<IUserInfo | null>(null)

	useEffect(() => {
		const currentUser = Cookies.get('user')
		if (currentUser) {
			setUser(JSON.parse(currentUser))
		}
	}, [])

	return user
}
