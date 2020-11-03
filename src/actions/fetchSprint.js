/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchSprint = (data) => {
    return {
        type: 'FETCH_SPRINT',
        sprint: data.sprints,
    }
}

export const fetchSprintChores = (data, house, sprint) => {
    return {
        type: 'FETCH_SPRINT_CHORES',
        sprintChores: data,
        sprintId: sprint,
        houseId: house,
    }
}