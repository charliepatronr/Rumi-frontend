/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider} from '@shoutem/ui';
import { loginSuccess } from '../actions/auth'





class Signup extends Component {
    constructor(props) {
        super()
        this.state = {
            name: '', 
            email: '', 
            img: '',
            username: '',
            password: '',
            error: null,
        }
    }


    signup = () => {
        // if (this.state.title  !== '' && this.state.description !== '' && this.state.points !== ''){
        //     const reqObj = {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         body:  JSON.stringify(this.state)
        //       }
        //       fetch(`http://localhost:3000/users`, reqObj)
        //       .then(resp => resp.json())
        //       .then(data => {
        //           console.log(data)
        //           this.props.add(data)
        //       })
        // }

    }


    render() {
      return (
        <View style = {styles.container}>
                <TextInput maxLength={25}
                    placeholder={'NAME'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ name: text})}
                    defaultValue = {this.state.name}
                />
                <TextInput maxLength={25}
                    placeholder={'EMAIL'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ email: text})}
                    defaultValue = {this.state.email}
                />
                    <TextInput maxLength={25}
                    placeholder={'PROFILE PICTURE'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ img: text})}
                    defaultValue = {this.state.img}
                />
                <TextInput maxLength={25}
                    placeholder={'USERNAME'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ username: text})}
                    defaultValue = {this.state.username}
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
                    <Button onPress = {this.signup} styleName="confirmation secondary" style={styles.button} >
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
      },
    input: {
        width: 300, 
    }, 
    overlay : {
        width: '104%',
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



export default connect(mapStateToProps, mapDispatchToProps)(Signup)