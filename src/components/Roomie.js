/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import Loading from './Loading'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, View, Text, ListView, Divider, Tile, Title, Caption, Subtitle, Row} from '@shoutem/ui';


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
            console.log(this.state.chores)
            this.state.chores.map(chore =>{
               if(chore.completion_status) {
                   count +=1
               }
            })
        }
        if(this.state.chores) {
        let percentage = ( count / this.state.chores.length ) * 100
        percentage = Math.round(percentage * 100) / 100
        return percentage
        }
        
        
    }

    render(){
        let percentage = this.completionStatus()
        const { navigation, route } = this.props
        const { id } = route.params;

        navigation.setOptions({
            title: 'Roomie',
        })

        if (!this.state.roomie){
            return <Loading isVisible = {true} text= 'LOADING'/>
        }

        return (
            // <View styleName='vertical h-center'>
            //     <View styleName='horizontal h-center'>
            //         <RoomieInfo roomie={this.state.roomie} />
            //         <View style={styles.completionBar}>
            //             <AnimatedCircularProgress
            //                 size={150}
            //                 width={15}
            //                 fill={ percentage }
            //                 tintColor="#00e0ff"
            //                 onAnimationComplete={() => console.log('onAnimationComplete')}
            //                 backgroundColor="#3d5875">
            //                 {
            //                     (fill) => (
            //                     <Text>
            //                         {percentage }% of Tasks 
            //                     </Text>
            //                     )
            //                 } 
            //             </AnimatedCircularProgress>
            //         </View>
            //     </View>
            //     <View styles={styles.assigned}>
            //         <Text >Assigned tasks this sprint</Text>
            //     </View>
            //     <View >
            //         { this.state.chores ? (
            //             <FlatList 
                        
            //             data={this.getChores()}
            //             renderItem = {(chore) => <Chore chore={chore} />}
            //             keyExtractor = {(item, index) => index.toString()}
            //             />
            //         ) : (
            //             <View style={styles.loader}>
            //                 <ActivityIndicator size= 'large'/>
            //                 <Text>Loading...</Text>
            //             </View>
            //             )
            //         }
            //     </View>
            // </View>
        <View styleName='vertical h-center' style={styles.main}>
            <View styleName='horizontal v-center'>
                <RoomieInfo roomie={this.state.roomie} />
                <View style={styles.completionBar}>
                    <AnimatedCircularProgress
                        size={150}
                        width={15}
                        fill={ percentage }
                        tintColor="#00e0ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                        {
                            (fill) => (
                            <Text>
                                {percentage }% of Tasks 
                            </Text>
                            )
                        } 
                    </AnimatedCircularProgress>
                </View>
            </View>
            <View>
                <Subtitle styleName=''>ASSIGNED TASKS THIS SPRINT</Subtitle>
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
    const {name, email, admin, img, historical_points, username, sprint_chores } = props.roomie
    return (
            <View>
                <View styleName='vertical h-center'>
                <View >
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
                    <View styleName='vertical h-center' >
                        {/* <Text style = {styles.roomieName}>{name}</Text> */}
                        <Subtitle styleName='bold'>{name.toUpperCase()}</Subtitle>
                        <Text >All time points: {historical_points}</Text>
                        {/* <Text style = {styles.roomieDescription}>{username}</Text> */}
                    </View>
                </View>
            </View>

    )

} 

const Chore = (props) => {

    const { chore } = props
    const {title, description, points, img, id } = chore.item

    return (
        // <View>
        //     <SafeAreaView style={styles.viewChore}>
        //         <TouchableOpacity >
        //             <Text style = {styles.choreName}>{title}</Text>
        //             <Text style = {styles.choreDescription}>{description}...</Text>
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
    main: {
        backgroundColor: '#fff', 
    },
    completionBar: {
        marginBottom: 10,
    },  
    roomieName: {
        fontWeight: 'bold',
    }, 
    userImage : {
        padding:10, 
    }, 
    img: {
        width: 90,
        height: 90,
        borderRadius: 60,
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
    choreDescription : {
        padding: 5,
        width: 300,
    }, 
})