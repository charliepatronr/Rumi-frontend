/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react'
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView} from 'react-native';
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
// import {size} from 'lodash'



const ListChores = (props) => {
    const {chores} = props
    const navigation = useNavigation();
    return (
                <View>
                { chores.length > 1 ? (
                    <FlatList
                    data={chores}
                    renderItem = {(chore) => <Chore chore={chore} navigation={navigation} />}
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

export default ListChores;



const Chore = (props) => {

    const { chore, navigation } = props
    const {title, description, points, img, id } = chore.item.chore
    const { user } = chore.item
    const sprintChoreId = chore.item.id
    console.log(sprintChoreId)
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'


    const goToChore = () => {
        navigation.navigate('chore', {
            id: sprintChoreId,
            title: title,
        });

    }
    const goToUserProfile = () => {

        navigation.navigate('roomie-profile', {
            id: user.id,
        })
    }
    return (
        <View>
            <SafeAreaView style={styles.viewChore}>
                <TouchableOpacity style={styles.userImage} onPress = {()=> goToUserProfile()}>
                    <Image style ={styles.img}
                    resizeMode= 'cover'
                    PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                    source={
                        user.img
                        ? {uri: img}
                        : {uri: profileImg}
                    }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => goToChore()}>
                    <Text style = {styles.choreName}>{title}</Text>
                    <Text style = {styles.choreDescription}>{description.substr(0,60)}...</Text>
                    <Text>Points: {points}</Text>
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
    viewChore: {
        flex: 1,
        flexDirection: 'row', 
        marginLeft: 15,
        marginBottom: 50,
    }, 
    choreName: {
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
    choreDescription : {
        padding: 5,
        width: 300,
    }
})