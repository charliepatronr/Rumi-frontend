/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS', 
        user: user
    }
} 


export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS', 
    }
} 


export const currentUser = (data) => {
    return {
        type: 'CURRENT_USER',
        user: data,
    }
} 
