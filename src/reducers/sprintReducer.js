/* eslint-disable semi */
/* eslint-disable prettier/prettier */

const sprintReducer = (state = {}, action) => {
    switch (action.type){
        case 'FETCH_SPRINT':
            let counter = 0
            action.sprint.forEach(sprint => {
                // console.log(sprint)
                if ( sprint.id > counter ) {
                    counter = sprint.id
                }
            })
            let currentSprint = action.sprint.filter(sprint => sprint.id === counter)
            // console.log(currentSprint)
            return currentSprint[0]

        case 'START_SPRINT':
            let d = new Date()
            let date = d.getDate()
            let month = d.getMonth()
            let year = d.getFullYear() 
            let dateStr = `${year}-${month}-${date}`
            return {
                ...state,
                begin_date: dateStr,
            }

        case 'END_SPRINT':
             d = new Date()
             date = d.getDate()
             month = d.getMonth()
             year = d.getFullYear() 
             dateStr = `${year}-${month}-${date}`
            return {
                ...state,
                end_date: dateStr,
                completion_status: true,
            }
        default:
            return state
    }

}

export default sprintReducer;
