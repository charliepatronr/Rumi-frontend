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
        case 'LOGOUT_SUCCESS':
            return {}
        default:
            return state
    }

}

export default authReducer
