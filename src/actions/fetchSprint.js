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
        sprint: data
    }
}

export const startSprint = (data) => {
    return {
        type: 'START_SPRINT',
        tempSprintChores: data,
        sprint: data[0].sprint
    }
}