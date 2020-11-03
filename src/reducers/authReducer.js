/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const authReducer = (state = {}, action) => {
    switch (action.type){
        case 'LOGIN_SUCCESS':
        case 'CURRENT_USER':
            // console.log(action.user)
            return action.user
        case 'LOGOUT_SUCCESS':
            return {}
        default:
            return state
    }

}

export default authReducer
