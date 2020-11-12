/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react'
import {StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity,} from 'react-native';
// import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { Button, View, Text, ListView, Divider, Tile, Title, Caption, Subtitle, Image, Row} from '@shoutem/ui';

// import {size} from 'lodash'



const ListChores = (props) => {
    const {chores} = props
    const navigation = useNavigation();
    return (
                <View>
                { chores.length >= 1 ? (
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
            <Divider styleName="line" />
            <Row>
                <TouchableOpacity onPress = {()=> goToUserProfile()}>
                    <Image style ={styles.img}
                    PlaceholderContent={<ActivityIndicator size='small' />}
                    source={
                        user.img
                        ? {uri: user.img}
                        : {uri: profileImg}
                    }
                    />
                </TouchableOpacity>
                <View styleName="vertical ">
                    <TouchableOpacity onPress = {() => goToChore()}>
                        <Subtitle  >{title.toUpperCase()}</Subtitle>
                        <Caption styleName='multiline'>{description.substr(0,60)}...</Caption>
                        <Caption>Points: {points}</Caption>
                    </TouchableOpacity>
                </View>
            </Row>
            <Divider styleName="line" />
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
        width: 69,
        height: 69,
        borderRadius: 40,
       
    }, 
    choreDescription : {
        padding: 5,
        width: 300,
    }
})