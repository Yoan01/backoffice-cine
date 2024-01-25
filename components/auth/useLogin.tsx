import { IUser } from '@/interface/IUser'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

export const useLogin = () => {
	const login = async (userMail: string, userPassword: string) => {
		const user = await axios
			.post('http://localhost:3001/ms/auth/login', { userMail, userPassword })
			.then((res) => {
				const token = res.data

				const user = jwt.decode(token) as IUser

				return user
			})
		if (user) {
			Cookies.set('user', JSON.stringify(user))
		}

		return user as IUser
	}

	return { login }
}
