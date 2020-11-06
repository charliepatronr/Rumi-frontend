/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { endSprint } from "../actions/fetchSprint"

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
            const {id, house_id, begin_date, end_date, completion_status, active} = action.sprint
            let sprint = {
                id: id, 
                house_id: house_id,
                begin_date: begin_date, 
                end_date: end_date, 
                completion_status: completion_status, 
                active: active
            }
            return {
                ...sprint
            }

        case 'END_SPRINT':
            return {
                ...state,
                end_date: action.sprint.end_date,
                completion_status: action.sprint.completion_status,
            }
        default:
            return state
    }

}

export default sprintReducer;
