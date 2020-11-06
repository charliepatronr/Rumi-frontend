/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { endSprint, startSprint } from '../actions/fetchSprint'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, View, Text} from '@shoutem/ui';
import ListChores from './ListChores'


class SprintFeed extends Component {
    constructor() {
        super()
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
        let d = new Date()
        let date = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear() 
        let dateStr = `${year}-${month}-${date}`

        let data = {
            end_date: dateStr, 
            completion_status: true, 
            active: false
        }

        // console.log(data, 'DATA')
        // console.log(dateStr, 'DATE STRING!!!!!')
        // console.log(this.props.sprint.id, 'SPRINT ID LASKDJALSKDJALSKDJASLKJDKADJKLD')



        const configObj = {
            method: 'PATCH', 
            headers : {
              'Content-Type' : 'application/json', 
              'Accept' : 'application/json'
            }, 
            body: JSON.stringify(data)
          }

        fetch(`http://localhost:3000/sprints/${this.props.sprint.id}`, configObj)
        .then(response => response.json())
        .then(data => {
            this.props.end(data)
        })
    }

    startSprint = () => {
        console.log('STARTING SPRINT')

        let d = new Date()
        let date = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear() 
        let dateStr = `${year}-${month}-${date}`

        data = {
            begin_date: dateStr,
            house_id: this.props.house.id
        }

        const configObj = {
            method: 'POST', 
            headers : {
              'Content-Type' : 'application/json', 
              'Accept' : 'application/json'
            }, 
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:3000/sprints/`, configObj)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.start(data)
        })
        
    }

    render() {
        let percentage = this.completionStatus()
        if (this.props.sprint.begin_date && !this.props.sprint.completion_status && this.props.sprint.active ) {
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
                    <View styleName="horizontal">
                        <View>
                        <Button styleName="secondary"  onPress = { () => this.endSprint()}>
                            <Text> END SPRINT</Text>
                        </Button>
                        </View>

                    </View>
                        : null
                    }
              </View>
            )
        } else if (this.props.user.admin && this.props.sprint.completion_status) {
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
                            <Text> Previous sprint completion </Text>
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
                    <View styleName="horizontal">
                        <Button styleName="secondary"  onPress = { () => this.startSprint()}>
                            <Text> START SPRINT</Text>
                        </Button>
                    </View>
   
                </View>
            );
        }  else if (!this.props.sprint.active ) {
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
                    <View styleName="horizontal">
                            <Button  styleName="confirmation">
                                <Text>CONFIRM SPRINT</Text>
                            </Button>
                            <Button styleName="confirmation secondary">
                                <Text>REJECT SPRINT</Text>
                            </Button>
                    </View>
                    <ListChores chores={this.props.sprintChores}/>
                </View>
            )
        }
        else {
            return(
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
                            <Text> Previous sprint completion </Text>
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
                    <Text> Ask admin to start sprint</Text>
                </View>
            )

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
        end: data => dispatch(endSprint(data)), 
        start: data => dispatch(startSprint(data))
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
        marginTop: 10,
        marginBottom: 10,
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