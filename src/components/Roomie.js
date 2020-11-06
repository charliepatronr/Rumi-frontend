/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, SafeAreaView, TouchableHighlightBase, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import Loading from './Loading'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button } from '@shoutem/ui';


class Roomie extends React.Component {
    constructor(props) {
        super()
        this.state = {
            roomie: null, 
            chores: null
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.route.params.id}`)
        .then(response => response.json())
        .then(response => {
            let sprintChores = response.sprint_chores.filter( chore => chore.sprint_id === this.props.sprint.id)
            this.setState({
                roomie: response,
                chores: sprintChores
            })
        })
    }

    getChores = () => {
        // let finalChores = this.state.chores.map(chore => {
        //     return this.props.chores.filter(houseChore => houseChore.id === chore.id)
        // })
        let finalChores = this.state.chores.map(chore => {
            return chore.chore
        })
       return finalChores
    }

    completionStatus = () => {
        let count  = 0;
        if(this.state.chores) {
            this.state.chores.map(chore =>{
               if(chore.completion_status) {
                   count +=1
               }
            })
        }
        let percentage = count / this.props.chores.length
        return percentage
    }

    render(){
        const { navigation, route } = this.props
        const { id } = route.params;

        navigation.setOptions({
            title: 'Roomie',
        })

        if (!this.state.roomie){
            return <Loading isVisible = {true} text= 'LOADING'/>
        }

        return (
            <View styles={styles.viewRoomie}>
                <RoomieInfo roomie={this.state.roomie} />
                <View style={styles.completionBar}>
                    <AnimatedCircularProgress
                        size={150}
                        width={15}
                        fill={ this.completionStatus() }
                        tintColor="#00e0ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                        {
                            (fill) => (
                            <Text>
                                {this.completionStatus() }% of Tasks 
                            </Text>
                            )
                        } 
                    </AnimatedCircularProgress>
                </View>
                <View styles={styles.assigned}>
                    <Text >Assigned tasks this sprint</Text>
                </View>
                <View >
                    { this.state.chores ? (
                        <FlatList 
                        
                        data={this.getChores()}
                        renderItem = {(chore) => <Chore chore={chore} />}
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
            </View>
        )

    }

}


const mapStateToProps = (state) => {
    return {
        house: state.house, 
        sprint: state.sprint, 
        chores: state.chores
    }
}

export default connect(mapStateToProps, null)(Roomie)


const RoomieInfo = (props) => {
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'
    const {name, email, admin, img, points, username, sprint_chores } = props.roomie
    return (
        // <View style={styles.viewName}>
        //     <View style={ {flexDirection: 'row'}}>
        //         <Text style= {styles.viewNameText}>{name}</Text>
        //     </View>
        //     <Text style={styles.descriptionRoomie}>{email} </Text>
        //     <Text style={styles.descriptionRoomie}>Points: {points}</Text>
        // </View>
            <View>
                <View >
                    <View style={styles.userImage} >
                        <Image style ={styles.img}
                        resizeMode= 'cover'
                        PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                        source={
                            img
                            ? {uri: img}
                            : {uri: profileImg}
                        }
                        />
                    </View>
                    <View styles={styles.roomieText}>
                        <Text style = {styles.roomieName}>{name}</Text>
                        <Text style = {styles.roomieDescription}>Historial Points:{points}</Text>
                        <Text style = {styles.roomieDescription}>{username}</Text>
                    </View>
                </View>
            </View>

    )

} 

const Chore = (props) => {

    const { chore } = props
    console.log(chore, 'CHORE !!!!!!!!!!!')
    const {title, description, points, img, id } = chore.item

    return (
        <View>
            <SafeAreaView style={styles.viewChore}>
                <TouchableOpacity >
                    <Text style = {styles.choreName}>{title}</Text>
                    <Text style = {styles.choreDescription}>{description}...</Text>
                    <Text>Points: {points}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    completionBar: {
        marginBottom: 10,
    }, 
    viewRoomie: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    }, 
    roomieName: {
        fontWeight: 'bold',
    }, 
    userImage : {
        padding:10, 
    }, 
    img: {
        width: 50,
        height: 50,
        borderRadius: 40,
    }, 
    roomieDescription : {
        padding: 5,
        width: 300,
    }, 
    roomieText : {
        marginRight: 45,
    },   
     completionBar: {
        margin: 20, 
    }, 
    assigned: {
        margin: 50,
    },
    viewChore: {
        flex: 1,
        flexDirection: 'row', 
        marginLeft: 15,
        marginBottom: 25,
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
})