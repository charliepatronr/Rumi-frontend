/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchHouseChores = (chores) => {
    return {
        type: 'FETCH_CHORES',
        chores: chores.chores,
    }
}