import React from 'react'
import {StyleSheet, FlatList, ActivityIndicator, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { Button, View, Text, TouchableOpacity, Image, Divider, Row, Subtitle, Caption} from '@shoutem/ui';





const ListChoresHome = (props) => {
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

export default ListChoresHome;



const Chore = (props) => {

    const { chore, navigation } = props
    const {title, description, points, img, id } = chore.item


    // const goToChore = () => {
    //     navigation.navigate('chore', {
    //         id: sprintChoreId,
    //         title: title,
    //     });

    // }

    return (
        // <View>
        //     <SafeAreaView style={styles.viewChore}>
        //         <TouchableOpacity >
        //             <Text style = {styles.choreName}>{title}</Text>
        //             <Text style = {styles.choreDescription}>{description}</Text>
        //             <Text>Points: {points}</Text>
        //         </TouchableOpacity>
        //     </SafeAreaView>
        // </View>
        <View styleName='vertical h-center '>
            <Divider styleName="line" />
            <Row>
                <TouchableOpacity >
                    <Subtitle styleName="h-center">{title.toUpperCase()}</Subtitle>
                    <Caption styleName="multiline">{description}</Caption>
                    <Caption styleName="h-center">Points: {points}</Caption>
                </TouchableOpacity>
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
    }, 
    list: {
        flex: 1
    }
})