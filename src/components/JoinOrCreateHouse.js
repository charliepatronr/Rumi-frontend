/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase, Alert} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider, Subtitle} from '@shoutem/ui';
import { loginSuccess } from '../actions/auth'
import { joinHouse } from '../actions/signUp';






class JoinOrCreateHouse extends Component {
    constructor(props) {
        super()
        this.state = {
            houseId: '', 
            error: null,
        }
    }

    createAlert = () => {
        Alert.alert(
            'WELCOME TO HOUSE STARK!', 
            'Be a greate RUMI', 
            [
                {
                    text: 'Ok',  onPress: () => console.log("OK Pressed") 
                }
            ],
            { cancelable: false }
        )
    }



    signup = () => {
        if (this.state.houseId  !== ''){
            let data = {
                ...this.props.info, 
                house_id: this.state.houseId
            }
            const reqObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:  JSON.stringify(data)
              }
              fetch(`http://localhost:3000/users`, reqObj)
              .then(resp => resp.json())
              .then(data => {
                  console.log(data)
                  this.props.join(data)
                  this.props.navigation.navigate('home', { screen: 'home-feed' })
                  if(data.message){
                      this.setState({
                          error: data.message
                      })
                  }
                  this.createAlert()
              })
        }

    }


    render() {
        console.log(this.props, 'PROPS!!!!!!!')

      return (
        <View style = {styles.container} styleName= 'vertical v-center'>
            <View>
                <View styleName = 'vertical h-center lg-gutter'>
                { this.state.error && <Text style={styles.error}>{this.state.error}</Text> }
                    <Subtitle>ENTER HOUSE KEY TO BE A RUMI</Subtitle>
                    <TextInput styleName='horizontal h-start' maxLength={25}
                        placeholder={'HOUSE KEY'}
                        style = {styles.input}
                        onChangeText = {text => this.setState({ houseId: text})}
                        defaultValue = {this.state.houseId}
                    />
                    <Divider styleName="line" />
                    <View styleName="horizontal">
                        <Button onPress = {() =>this.signup()} styleName="confirmation secondary" style={styles.button} >
                            <Text>BECOME A RUMI</Text>
                        </Button>
                    </View>
                </View>

                    <View  styleName = 'vertical h-center lg-gutter'>
                        <View styleName ='v-center'>
                            <Subtitle>CREATE A NEW HOUSE</Subtitle>
                        </View>
                        <View styleName ='horizontal'>
                        <Button onPress = {() =>console.log('CREATE A HOUSE')} styleName="confirmation secondary" style={styles.button} >
                            <Text>CREATE HOUSE</Text>
                        </Button>

                        </View>

                    </View>

            </View>
            
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    button: {
        marginTop: 20,

    },
    container: {
        flex: 1, 
        backgroundColor: '#fff'
      },
    input: {
        width: 300, 
    }, 
    overlay : {
        width: '104%',
    }, 
    error: {
        color: 'red'
    }
  });

  const mapStateToProps = (state) => {
    return {
        info: state.signUp, 
    }
  }


const mapDispatchToProps = dispatch => {
    return {
        join: data => dispatch(joinHouse(data)),
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(JoinOrCreateHouse)