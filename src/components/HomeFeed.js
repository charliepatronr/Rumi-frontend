/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import {fetchHouseChores } from '../actions/fetchChoresAction'
import { fetchRoomies } from '../actions/fetchRoomies'
import { fetchSprint, fetchSprintChores } from '../actions/fetchSprint'
import { fetchHouseInfo } from '../actions/fetchHouse';
import { currentUser } from '../actions/auth';

import ListChores from './ListChores'



class HomeFeed extends Component {
    constructor() {
        super()
    }

    componentDidMount(){
          fetch(`http://localhost:3000/houses/1`)
          .then(resp => resp.json())
          .then(data => {
            this.props.fetchChores(data)
            this.props.roomies(data)
            this.props.sprint(data)
            this.props.user(data)
            this.props.house(data)
        })
        .then(() => fetch(`http://localhost:3000/sprint_chores`))
        .then(response => response.json())
        .then(data => {
            let house = this.props.houseState.id
            let sprint = this.props.sprintState.id
            this.props.sprintChores(data, house, sprint)
        })
    }


     goToHome = () => {
        console.log('GOING HOME!!!!')
    }

    render() {
        console.log(this.props)
      return (
          <View>
            <TouchableOpacity style={styles.houseImage} onPress = {()=> this.goToHome()}>
                <Image style ={styles.img}
                PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                source={
                    this.props.houseState.img
                    ? {uri: this.props.houseState.img}
                    : {uri: '' }
                }
                />
            </TouchableOpacity>
              { !this.props.sprintState.completion_status && this.props.sprintState.begin_date ?
                <ListChores chores={this.props.sprintChoresState}/>
                :
                <Text>Start sprint!!!</Text>
              }
          </View>
      );
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
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: 'black',
    }, 
    choreDescription : {
        padding: 5,
        width: 300,
    }
})