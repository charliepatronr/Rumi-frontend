/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const choresReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_CHORES':
            // console.log(action.chores)
            return action.chores
        case 'ADD_CHORE':
            return [...state, action.newChore]
        default:
            return state
    }

}

export default choresReducer;
