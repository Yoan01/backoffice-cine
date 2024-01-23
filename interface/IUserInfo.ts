export interface IUserInfo {
	exp: number
	iat: number
	userInfo: {
		email: string
		name: string
		age: number
		isStudent: boolean
	}
}
