/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import Loading from './Loading'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, View, Text, ListView, Divider, Tile, Title, Caption, Subtitle, Row} from '@shoutem/ui';



class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            chores: null
        }
    }

    // componentDidMount() {
    //     fetch(`http://localhost:3000/users/${this.props.user.id}`)
    //     .then(response => response.json())
    //     .then(response => {
    //         let sprintChores = response.sprint_chores.filter( chore => chore.sprint_id === this.props.sprint.id)
    //         this.setState({
    //             chores: sprintChores
    //         })
    //     });
    // }

    getChores = () => {
        // let finalChores = this.state.chores.map(chore => {
        //     return this.props.chores.filter(houseChore => houseChore.id === chore.id)
        // })
        // console.log(finalChores)
        let finalChores = this.props.sprintChores.filter(sprintChore => sprintChore.user.id === this.props.user.id)
        let returnChores = finalChores.map(sprintChore => sprintChore.chore)

       return returnChores

    }

    completionStatus = () => {
        let count  = 0;
        let myChores = this.getChores()
        let sprintChores = this.props.sprintChores.filter(sprintChore => {
             let chore = myChores.filter(chore => sprintChore.chore.id === chore.id)
            if(chore.length >= 1 && chore[0].id === sprintChore.chore.id) {
                return true
            }
        })

        sprintChores.map(chore =>{
            if(chore.completion_status) {
                count +=1
            }
         })
         let percentage = ( count / myChores.length) * 100
         percentage = Math.round(percentage * 100) / 100
         return percentage
    }
    renderRow(chore) {
        if (!chore) {
          return null;
        }
      
        return (
          <View>
            <Divider styleName="line" />
                <Chore chore={chore} />
            <Divider styleName="line" />
          </View>
        );
      }
      


    render(){
        
        const { navigation } = this.props
        const myChores = this.getChores()
        console.log(myChores, 'MY CHORES !!!!!!!!!')
        let percentage = this.completionStatus()
        navigation.setOptions({
            title: 'Profile',
        })

        

        if (!this.props.user){
            return <Loading isVisible = {true} text= 'LOADING'/>
        }

        if  (!this.props.sprint.completion_status && this.props.sprint.active && myChores.length >= 1) {
            return (
                <View styleName='vertical h-center' style={styles.main}>
                    <View styleName='horizontal v-center'>
                        <UserInfo user={this.props.user} />
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
                                        {this.completionStatus() }% of Tasks 
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
                        { myChores.length >= 1 ? (
                            <FlatList 
                            data={myChores}
                            renderItem = {(chore) => <Chore chore={chore} />}
                            keyExtractor = {(item, index) => index.toString()}
                            />
                            // <ListView
                            // data={myChores}
                            // renderRow={this.renderRow}
                            // />
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

        } else if (!this.props.sprint.active && this.props.sprint.begin_date ) {
                return (
                    <View styleName='vertical h-center md-gutter-vertical' style={styles.main}>
                        <View styleName='v-center'>
                            <UserInfo user={this.props.user} />
                        </View>
                        <View style={styles.completionBar}>
                            {/* <AnimatedCircularProgress
                                size={150}
                                width={15}
                                fill={ percentage }
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
                            </AnimatedCircularProgress> */}
                        </View>
                        <View styles={styles.assigned}>
                            <Subtitle styleName='bold' >PENDING SPRINT ASSIGNMENT</Subtitle>
                        </View>
                        <View >
                            { myChores.length >= 1 ? (
                                <FlatList 
                                data={myChores}
                                renderItem = {(chore) => <Chore chore={chore} />}
                                keyExtractor = {(item, index) => index.toString()}
                                />
                                // <ListView
                                // data={myChores}
                                // renderRow={this.renderRow}
                                // />
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
            } else if(myChores.length === 0){
                return (
                    <View styleName='vertical h-center md-gutter-vertical' style={styles.main}>
                        <View styleName='v-center'>
                            <UserInfo user={this.props.user} style={styles.middle}/>
                        </View>
                        <View>
                            <Subtitle styleName = 'md-gutter-vertical' >NO CHORES ASSIGNED</Subtitle>
                        </View>
                        <View style={styles.completionBar}>
                            <AnimatedCircularProgress
                                size={150}
                                width={15}
                                fill={0}
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
                    </View>
                </View>

                )


            } else {
                return (
                    <View styleName='vertical h-center md-gutter-vertical' style={styles.main}>
                        <View styleName='v-center'>
                            <UserInfo user={this.props.user} style={styles.middle}/>
                        </View>
                        <View>
                            <Subtitle styleName = 'md-gutter-vertical' >YOUR PREVIOUS SPRINT COMPLETION</Subtitle>
                        </View>
                        <View style={styles.completionBar}>
                            <AnimatedCircularProgress
                                size={150}
                                width={15}
                                fill={percentage }
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
                    </View>
                </View>

                )


            }

    }

}

const mapStateToProps = (state) => {
    return {
        house: state.house, 
        sprint: state.sprint, 
        chores: state.chores, 
        user: state.auth,
        sprintChores: state.sprintChores
    }
}

export default connect(mapStateToProps, null)(Profile)


const Chore = (props) => {
    const { chore } = props
    const {title, description, points, img, id } = chore.item

    return (
        <View styleName='vertical h-center '>
            <Divider styleName="line" />
            <Row>
            {/* <SafeAreaView style={styles.viewChore}> */}
                <TouchableOpacity >
                    {/* <Text style = {styles.choreName}>{title}</Text> */}
                    <Subtitle styleName="h-center">{title.toUpperCase()}</Subtitle>
                    {/* <Text style = {styles.choreDescription}>{description}...</Text> */}
                    <Caption styleName="multiline">{description}</Caption>
                    {/* <Text>Points: {points}</Text> */}
                    <Caption styleName="h-center">Points: {points}</Caption>
                </TouchableOpacity>
                </Row>
                <Divider styleName="line" />

            {/* </SafeAreaView> */}
        </View>
    )

}



const UserInfo = (props) => {
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'
    const {name, email, admin, img, historical_points, username, sprint_chores } = props.user
    return (
        // <View style={styles.viewName}>
        //     <View style={ {flexDirection: 'row'}}>
        //         <Text style= {styles.viewNameText}>{name}</Text>
        //     </View>
        //     <Text style={styles.descriptionRoomie}>{email} </Text>
        //     <Text style={styles.descriptionRoomie}>Points: {points}</Text>
        // </View>
            <View >
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
                        <Subtitle styleName='bold'>{name.toUpperCase()}</Subtitle>
                        <Text style = {styles.userDescription}>All time points: {historical_points}</Text>
                        {/* <Text style = {styles.userDescription}>{username}</Text> */}
                    </View>
                </View>
            </View>

    )

} 

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff', 
        flex: 1
    },
    middle: {
        flex: 1
      },
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
        width: 90,
        height: 85,
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
    img: {
        width: 90,
        height: 90,
        borderRadius: 60,
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    choreDescription : {
        padding: 5,
        width: 300,
    }, 
})