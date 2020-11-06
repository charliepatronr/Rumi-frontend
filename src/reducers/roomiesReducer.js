/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const roomiesReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_ROOMIES':
            console.log(action.roomies)
            return [...action.roomies]
        case 'ADD_ROOMIE':
            return [...state, action.newRoomie]
        default:
            return state
    }

}

export default roomiesReducer
