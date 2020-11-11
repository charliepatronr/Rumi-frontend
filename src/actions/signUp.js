

export const signUp = (data) => {
    return {
        type: 'SIGN_UP', 
        newRoomie: data
    }
} 


export const joinHouse = (data) => {
    return {
        type: 'JOIN_HOUSE', 
        newRoomie: data
    }
} 