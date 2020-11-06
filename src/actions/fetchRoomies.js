/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchRoomies = (data) => {
    return {
        type: 'FETCH_ROOMIES',
        roomies: data.house.users,
    }
}