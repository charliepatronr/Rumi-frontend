/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider, Image} from '@shoutem/ui';
import { loginSuccess } from '../actions/auth'
import { useNavigation } from '@react-navigation/native'
// import rumi from '../image/rumi.js'







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
              <View styleName= 'vertical h-center v-start lg-gutter'>
                  <Image
                  styleName= 'large-banner'
                  
                  source={require('/Users/charliepatron/Development/code/mod-5/rumie/assets/first.jpg')}
                  />
              </View>

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
    },
    logo: {
      width: 300, 
      height: 300,
      // justifyContent: 'center', 
      // alignContent: 'center', 
      // position: 'absolute'

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


