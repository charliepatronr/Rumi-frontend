/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const roomiesReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_ROOMIES':
            console.log(action.roomies)
            return [...action.roomies]
        case 'ADD_ROOMIE':
            return [...state, action.newRoomie]
        case 'COMPLETE_TASK':
            console.log(action.user,  'USER ID !!!!!!!!')

            let targetRoomie = state.filter(roomie => roomie.id === action.user)
            console.log(targetRoomie, 'TARGET ROOMIE!!!!!')

            let totalPoints = targetRoomie[0].historical_points + action.points
            console.log(totalPoints, 'TOTL POINTS!')

            targetRoomie[0].historical_points = totalPoints
            console.log(targetRoomie, 'NEW TARGET ROOMIE !')

            let otherRoomies = state.filter(roomie => roomie.id !== action.user)
            console.log(otherRoomies, 'OTHER ROOMIES!!!!')

            return [...otherRoomies].concat(targetRoomie)

        default:
            return state
    }

}

export default roomiesReducer
