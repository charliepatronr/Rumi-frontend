/* eslint-disable semi */
/* eslint-disable prettier/prettier */

export const fetchHouseInfo = (data) => {
    const {id, name, address, unique_key, img, rules} = data
    let houseObj = {
        id: id,
        name: name,
        address: address,
        unique_key: unique_key,
        img: img,
        rules: rules,
    }
    return {
        type: 'FETCH_HOUSE',
        house: houseObj,
    }
}