/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchHouseChores = (data) => {
    return {
        type: 'FETCH_CHORES',
        chores: data.house.chores,
    }
}