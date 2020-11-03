/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const houseReducer = (state = {}, action) => {
    switch (action.type){
        case 'FETCH_HOUSE':
            // console.log(action.house)
            return action.house
        default:
            return state
    }

}

export default houseReducer;
