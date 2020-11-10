/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider} from '@shoutem/ui';
import { loginSuccess } from '../actions/auth'
import { useNavigation } from '@react-navigation/native'






const  LandingPage = () => {


     const navigation = useNavigation();


    const goToLogin = () => {
        navigation.navigate('login');

    }
    const goToSignup = () => {

        navigation.navigate('signup')
    }

      return (
          <View style ={styles.container}>
            <View styleName="horizontal" >
                <Button  styleName="confirmation secondary" onPress = {() => goToLogin()}>
                    <Text>LOGIN</Text>
                </Button>
                <Button styleName="confirmation secondary" onPress ={() => goToSignup()}>
                    <Text>SIGN UP</Text>
                </Button>
            </View>
          </View>

      );
  }

export default connect(mapStateToProps, null)(LandingPage)


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
    }
  });

  const mapStateToProps = (state) => {
    return {
        user: state.auth, 
    }
  }


// const mapDispatchToProps = dispatch => {
//     return {
//         login: data => dispatch(loginSuccess(data)),
//     };
//   };


