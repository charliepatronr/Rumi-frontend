import React from 'react'
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView} from 'react-native';
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'



const ListRoomies = (props) => {
    const {roomies} = props
    const navigation = useNavigation();
    return (
                <View>
                { roomies.length >= 1 ? (
                    <FlatList
                    data={roomies}
                    renderItem = {(roomie) => <Roomie roomie={roomie} navigation={navigation} />}
                    keyExtractor = {(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.loader}>
                        <ActivityIndicator size= 'large'/>
                        <Text>Loading...</Text>
                    </View>
                    )
                }
                </View>
        );
}



// const mapStateToProps = (state) => {
//     return {
//         chores: state.chores,
//         house: state.house, 
//         roomies: state.roomies, 
//         user: state.auth, 
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchrOOs: house => dispatch(fetchHouseChores(house)),
//     };
//   };



export default ListRoomies;



const Roomie = (props) => {

    const { roomie } = props
    console.log(roomie)
    const {name, img, admin, email, points, historical_points,} = roomie.item
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'

    // const goToUserProfile = () => {

    //     navigation.navigate('roomie-profile', {
    //         id: user.id,
    //     })
    // }
    return (
        <View>
            <SafeAreaView style={styles.viewRoomie}>
                <TouchableOpacity style={styles.userImage} >
                    <Image style={styles.img}
                    resizeMode= 'cover'
                    PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                    source={
                        img
                        ? {uri: img}
                        : {uri: profileImg}
                    }
                    />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style = {styles.roomieName}>{name}</Text>
                    { admin ? <Text> Administrator</Text> : null }
                    <Text style = {styles.roomieInfo}>{email}...</Text>
                    <Text>All time points: {historical_points}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    loader: {
        marginTop:10,
        marginBottom: 10,
        alignItems: 'center',
    }, 
    viewRoomie: {
        flex: 1,
        flexDirection: 'row', 
        marginLeft: 15,
        marginBottom: 50,
    }, 
    roomieName: {
        fontWeight: 'bold',
    }, 
    userImage : {
        marginRight: 15,
    }, 
    img: {
        width: 50,
        height: 50,
        borderRadius: 40,
    }, 
    roomieInfo : {
        padding: 5,
        width: 300,
    }
})