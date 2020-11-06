/* eslint-disable semi */
/* eslint-disable prettier/prettier */

// REMEMBER TO GET LAST N SPRINT CHORES !!!!!!! 
// DUE TO N AMOUNT OF SPRINT REJECTION BEFORE CREATION 

const sprintChoresReducer = (state = [], action) => {
    switch (action.type){
        case 'FETCH_SPRINT_CHORES':
            // console.log(action.sprintChores)
            // console.log(action.sprintId)
            // console.log(action.houseId)
            let sprintChores = action.sprintChores.filter(sprint => {
                if (sprint.sprint_id === action.sprintId) {
                    return true
                } else {
                    return false
                }
            });
            // console.log(sprintChores)
            return [...sprintChores]
        
        case 'START_SPRINT':
            return [...action.tempSprintChores]
        default:
            return state
    }

}

export default sprintChoresReducer;



export const startSprint = (data) => {
    return {
        type: 'START_SPRINT',
        tempSprintChores: data.sprintChores, 
        sprint: data
    }
}