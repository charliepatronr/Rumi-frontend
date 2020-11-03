/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const sprintChoresReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_SPRINT_CHORES':
            // console.log(action.sprintChores)
            // console.log(action.sprintId)
            // console.log(action.houseId)
            let sprintChores = action.sprintChores.filter(sprint => {
                if (sprint.sprint_id === action.sprintId && sprint.sprint.house_id === action.houseId) {
                    return true
                } else {
                    return false
                }
            });
            // console.log(sprintChores)
            return [...sprintChores]
        default:
            return state
    }

}

export default sprintChoresReducer;
