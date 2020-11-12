/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const houseReducer = (state = {}, action) => {
    switch (action.type){
        case 'FETCH_HOUSE':
            // console.log(action.house)
            return action.house
        case 'END_SPRINT': 
            let rumi = action.rumiOfTheWeek
            console.log(rumi, 'RUMI ID!!!!!!!!!!')
            return {
                ...state, 
                rof_week: rumi
            }
        default:
            return state
    }

}

export default houseReducer;
