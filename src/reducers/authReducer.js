/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const authReducer = (state = {}, action) => {
    switch (action.type){
        case 'LOGIN_SUCCESS':
        case 'CURRENT_USER':
            const {id, house_id, name, img, admin, username, email, points, historical_points } = action.user
            let user = {
                id: id, 
                house_id: house_id,
                name: name, 
                img: img, 
                admin: admin, 
                username: username, 
                email: email, 
                points: points,
                historical_points: historical_points
            }
            // console.log(action.user)
            return user
        case 'JOIN_HOUSE':
            let newRoomie = {
                id: action.newRoomie.id, 
                house_id: action.newRoomie.house_id,
                name: action.newRoomie.name, 
                img: action.newRoomie.img, 
                admin: action.newRoomie.admin, 
                username: action.newRoomie.username, 
                email: action.newRoomie.email, 
                points: action.newRoomie.points,
                historical_points: action.newRoomie.historical_points
            }
            return newRoomie
        case 'COMPLETE_TASK':
            let chorePoints = action.points
            let pastPoints = state.historical_points
            let newPoints = chorePoints + pastPoints
            if(action.user === state.id){
                console.log( newPoints, 'ENTERED IF CORRECTLY')
                return {
                    ...state, 
                    historical_points: newPoints
                }
            } else {
                console.log('DIDNT ENTER IF CORRECTELY')
                return{
                    ...state
                }
            }
        case 'END_SPRINT':
            //action.roomies
            let newAth 
            action.roomies.forEach(roomie => {
                console.log(roomie.id, 'ROOMIE ID')
                console.log(state.id, 'STATE ID!!!!!!!!!!')
                if(roomie.id === state.id){
                    newAuth = {
                        ...state, 
                        historical_points: roomie.historical_points
                    }
                }
            })
            console.log(newAth)
            return newAuth
        case 'LOGOUT_SUCCESS':
            return {}
        default:
            return state
    }

}

export default authReducer
