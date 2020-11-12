/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchHouseInfo = (data) => {
    const {id, name, address, unique_key, img, rules, rof_week} = data.house
    let houseObj = {
        id: id,
        name: name,
        address: address,
        unique_key: unique_key,
        img: img,
        rules: rules,
        rof_week: rof_week
    }
    return {
        type: 'FETCH_HOUSE',
        house: houseObj,
    }
}