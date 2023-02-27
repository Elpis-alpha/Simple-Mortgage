import { backendLocation } from './utils'


// User Routes
export const createUser = () => `${backendLocation}/api/users/create`

export const getUser = () => `${backendLocation}/api/users/user`

export const editUser = () => `${backendLocation}/api/users/update`

export const deleteUser = () => `${backendLocation}/api/users/delete`

export const getUserbyID = (userID) => `${backendLocation}/api/users/id/${userID}`

export const getUserbyEmail = (email) => `${backendLocation}/api/users/email/${email}`

export const changePassword = () => `${backendLocation}/api/users/change-password`

export const userExistence = (email) => `${backendLocation}/api/users/user/exists?email=${email}`

export const loginUser = () => `${backendLocation}/api/users/login`

export const logoutUser = () => `${backendLocation}/api/users/logout`
