/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, SafeAreaView, TouchableHighlightBase, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { fetchSprint } from '../actions/fetchSprint'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button } from 'react-native-elements';


class SprintFeed extends Component {
    constructor() {
        super()
        this.state = {
            completion: 0
        }
    }

    completionStatus = () => {
        let count  = 0;
        this.props.sprintChores.map(chore =>{
           if(chore.completion_status) {
               count +=1
           }
        })
        let percentage = count / this.props.sprintChores.length
        // why does this cause an infinite re rendering loop???????
        // this.completionStatus() after render
        // this.setState({
        //     completion: percentage
        // })
        return percentage
    }

    endSprint = () => {
        this.setState({
            completion: 5
        })
        console.log(this.state.completion)
        console.log(this.props.user.admin)
    }

    render() {
        let percentage = this.completionStatus()
        if (this.props.sprint.begin_date && !this.props.sprint.completion_status ) {
            return (
                <View>
                <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                    <Image style ={styles.img}
                    PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                    source={
                        this.props.house.img
                        ? {uri: this.props.house.img}
                        : {uri: '' }
                    }
                    />
                </TouchableOpacity>
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
                               {percentage} % of Tasks 
                              </Text>
                            )
                          } 
                    </AnimatedCircularProgress>
                </View>
                {
                    this.props.user.admin ?
                    <Button buttonStyle={styles.buttonStyle}  onPress = { () => this.endSprint()}
                        title=" End Sprint"
                        raised= {true}
                    />
                    : null
                }
              </View>
            )
        } else if (this.props.user.admin) {
            return (
                <View>
                    <Button buttonStyle={styles.buttonStyle}  onPress = { () => this.endSprint()}
                        title=" Start Sprint"
                        raised= {true}
                    />
                </View>
            );
        } else {
            <View>
                <Text> Ask admin to start sprint</Text>
            </View>
        }

    }
  }



const mapStateToProps = (state) => {
    return {
        chores: state.chores,
        house: state.house, 
        sprint: state.sprint, 
        roomies: state.roomies, 
        user: state.auth, 
        sprintChores: state.sprintChores
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sprintFetch: data => dispatch(fetchSprint(data)), 
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(SprintFeed)



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
    houseImage : {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 35,
    }, 
    img: {
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: 'black',
    }, 
    choreDescription : {
        padding: 5,
        width: 300,
    }, 
    completionBar: {
        margin: 20, 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    buttonStyle: {
        width: 400,
        alignItems: 'center', 
        justifyContent: 'center'
    }
})