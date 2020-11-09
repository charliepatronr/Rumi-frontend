/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchHouseChores = (data) => {
    return {
        type: 'FETCH_CHORES',
        chores: data.house.chores,
    }
}

export const completeTask = (data) => {
    return {
        type: 'COMPLETE_TASK', 
        chore: data
    }
}

export const addTask = (data) => {
    return {
        type: 'ADD_CHORE', 
        newChore: data
    }
}