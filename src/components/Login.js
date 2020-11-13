/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider, Image} from '@shoutem/ui';
import { loginSuccess } from '../actions/auth'





class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            username: '',
            password: '',
            error: null,
        }
    }


    login = () => {
        if (this.state.title  !== '' && this.state.description !== '' && this.state.points !== ''){
            const reqObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:  JSON.stringify(this.state)
              }
              fetch(`http://localhost:3000/auth`, reqObj)
              .then(resp => resp.json())
              .then(data => {
                if (data.error) {
                    this.setState({
                      error: data.error
                    })
                    console.log(data)
                  } else {
                    this.props.login(data)
                  }
              })
        }

    }


    render() {
      return (
        <View style = {styles.container}>
              <View styleName= 'v-start'>
                  <Image
                  styleName= 'medium-portrait'
                  
                  source={require('/Users/charliepatron/Development/code/mod-5/rumie/assets/eight.jpg')}
                  />
              </View>
             { this.state.error && <Text style={styles.error}>{this.state.error}</Text> }
                <TextInput maxLength={25}
                    placeholder={'USERNAME'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ username: text})}
                    defaultValue = {this.state.username}
                    autoCapitalize ={'none'}
                />
                <Divider styleName="line" />
                <TextInput style={styles.text}
                    placeholder={'PASSWORD'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ password: text})}
                    defaultValue = {this.state.password}
                    secureTextEntry
                />
                 <Divider styleName="line" />
                 <View styleName="horizontal">
                    <Button onPress = {this.login} styleName="confirmation secondary" style={styles.button} >
                        <Text>SUBMIT</Text>
                    </Button>
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
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    logo: {
      width: 300, 
      height: 300,

    }
  });

  const mapStateToProps = (state) => {
    return {
        user: state.auth, 
    }
  }


const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(loginSuccess(data)),
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(Login)