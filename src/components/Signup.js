/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider, Image} from '@shoutem/ui';
import { signUp } from '../actions/signUp';


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




     joinCreateHouse = () => {
        const {name, email, username, password } = this.state
        if (name  !== '' && email !== '' && username !== '' && password !== ''){
            this.props.signUprumi(this.state)
            this.props.navigation.navigate('join-or-create-house')
            // const reqObj = {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body:  JSON.stringify(this.state)
            //   }
            //   fetch(`http://localhost:3000/users`, reqObj)
            //   .then(resp => resp.json())
            //   .then(data => {
            //       console.log(data)
            //       this.props.add(data)
            //   })
        } else {
            this.setState({
                error: 'All fields must be filled'
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
                    placeholder={'NAME'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ name: text})}
                    defaultValue = {this.state.name}
                />
                <Divider styleName="line" />
                <TextInput maxLength={25}
                    placeholder={'EMAIL'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ email: text})}
                    defaultValue = {this.state.email}
                />
                <Divider styleName="line" />
                <TextInput
                    placeholder={'PROFILE PICTURE'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ img: text})}
                    defaultValue = {this.state.img}
                />
                <Divider styleName="line" />
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
                    <Button onPress = {() =>this.joinCreateHouse()} styleName="confirmation secondary" style={styles.button} >
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
    error: {
        color: 'red'
    }
  });

  const mapStateToProps = (state) => {
    return {
        user: state.auth, 
    }
  }


const mapDispatchToProps = dispatch => {
    return {
        signUprumi: data => dispatch(signUp(data)),
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(Signup)