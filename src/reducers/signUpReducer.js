


const signUpReducer = (state = {}, action) => {
    switch (action.type){
        case 'SIGN_UP':
            return action.newRoomie
        case 'JOIN_HOUSE':
            return action.newRoomie
        default:
            return state
    }

}

export default signUpReducer
