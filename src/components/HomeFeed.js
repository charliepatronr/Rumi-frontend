/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {fetchHouseChores } from '../actions/fetchChoresAction'
import { fetchRoomies } from '../actions/fetchRoomies'
import { fetchSprint, fetchSprintChores } from '../actions/fetchSprint'
import { fetchHouseInfo } from '../actions/fetchHouse';
import { currentUser } from '../actions/auth';
import {Icon} from 'react-native-elements'
import { Button, View, Text, ListView, Divider, Tile, Title, Caption, Subtitle, Image, Row} from '@shoutem/ui';
import ListChores from './ListChores'
import Loading from './Loading'




class HomeFeed extends Component {
    constructor() {
        super()
    }

    componentDidMount(){
          fetch(`http://localhost:3000/users/${this.props.userState.id}`)
          .then(resp => resp.json())
          .then(data => {
            this.props.fetchChores(data)
            this.props.sprint(data)
            this.props.user(data)
            this.props.house(data)
            this.props.roomies(data)
     
            
        })
        .then(() => fetch(`http://localhost:3000/houses/${this.props.houseState.id}`))
        .then(response => response.json())
        .then(data => {
            let house = this.props.houseState.id
            let sprint = this.props.sprintState.id
            this.props.sprintChores(data, sprint)

        })
    }


     goToHome = () => {
        console.log('GOING HOME!!!!')
        
    }


    render() {


        if (!this.props.sprintState.completion_status && this.props.sprintState.active && this.props.sprintState.approval ) {
            return (
                <View style={styles.main}>
                    <View>
                        <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                            <Image style ={styles.img}
                            PlaceholderContent = {<ActivityIndicator size="small" />}
                            resizeMode={'stretch'}
                            source={
                                this.props.houseState.img
                                ? {uri: this.props.houseState.img}
                                : {uri: '' }
                            }
                            />
                        </TouchableOpacity>
                    </View>
                    <ListChores chores={this.props.sprintChoresState}/>
                </View>
            )
        }  else if (!this.props.sprintState.active && this.props.sprintState.begin_date ) {
            return (
                <View style={styles.main}>
                <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                    <Image style ={styles.img}
                    PlaceholderContent = {<ActivityIndicator size="small" />}
                    resizeMode={'stretch'}
                    source={
                        this.props.houseState.img
                        ? {uri: this.props.houseState.img}
                        : {uri: '' }
                    }
                    />
                </TouchableOpacity>
                <View style={styles.starting}>
                    <Subtitle styleName='bold'>VOTE AND WAIT FOR RUMIS</Subtitle>
                </View>
            </View>
            )
        } else if (this.props.userState.admin && !this.props.sprint.end_date ) {
            return (
                <View style={styles.main}>
                    <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                        <Image style ={styles.img}
                        resizeMode={'stretch'}
                        PlaceholderContent = {<ActivityIndicator size="small" />}
                        source={
                            this.props.houseState.img
                            ? {uri: this.props.houseState.img}
                            : {uri: '' }
                        }
                        />
                    </TouchableOpacity>
                    <View style={styles.starting}>
                        <Subtitle styleName='bold'>START NEW SPRINT ADMIN!</Subtitle>
                    </View>
                </View>
            )
           
        } else {
            return (
                <View style={styles.main} styleName='vertical'>
                    <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                        <Image style ={styles.img}
                        PlaceholderContent = {<ActivityIndicator size="small" />}
                        resizeMode={'stretch'}
                        source={
                            this.props.houseState.img
                            ? {uri: this.props.houseState.img}
                            : {uri: '' }
                        }
                        />
                    </TouchableOpacity>
                    <View style={styles.starting}>
                        <Subtitle styleName='bold'>ASK ADMIN TO START NEW SPRINT</Subtitle>
                    </View>
                </View>
            )
        }
        

    }
  }


const mapStateToProps = (state) => {
    return {
        choresState: state.chores,
        houseState: state.house, 
        sprintState: state.sprint, 
        roomiesState: state.roomies, 
        userState: state.auth, 
        sprintChoresState: state.sprintChores
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChores: house => dispatch(fetchHouseChores(house)),
        sprint: data => dispatch(fetchSprint(data)), 
        house: data => dispatch(fetchHouseInfo(data)),
        roomies: data => dispatch(fetchRoomies(data)), 
        user: data => dispatch(currentUser(data)),
        sprintChores: (data, house, sprint) => dispatch(fetchSprintChores(data, house, sprint)),
    };
  };



  export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed)


  const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff', 
        flex: 1
    },
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
        margin: 5,
    }, 
    img: {
        width: 110,
        height: 90,
        borderRadius: 40,
    }, 
    choreDescription : {
        padding: 5,
        width: 300,
    }, 
    starting: {
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1
      }
})