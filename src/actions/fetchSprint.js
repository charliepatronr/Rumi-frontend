/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchSprint = (data) => {
    return {
        type: 'FETCH_SPRINT',
        sprint: data.house.sprints,
    }
}

export const fetchSprintChores = (data, sprint) => {
    return {
        type: 'FETCH_SPRINT_CHORES',
        sprintChores: data.sprint_chores,
        sprintId: sprint,
    }
}

export const endSprint = (data) => {
    return {
        type: 'END_SPRINT',
        sprint: data, 
        roomies: data.users,
        rumiOfTheWeek: data.users[0].house.rof_week
    }
}

export const startSprint = (data) => {
    return {
        type: 'START_SPRINT',
        tempSprintChores: data,
        sprint: data[0].sprint
    }
}

export const updateSprint = (data) => {
    return {
        type: 'UPDATE_SPRINT', 
        tempSprintChores: data,
        sprint: data[0].sprint
    }
}