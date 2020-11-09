/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, TouchableHighlightBase} from 'react-native';
import {  TextInput, Text, View, Button, Icon, Overlay, Divider} from '@shoutem/ui';
import { addTask } from '../actions/fetchChoresAction'





class AddChore extends Component {
    constructor(props) {
        super()
        this.state = {
            title: '',
            description: '',
            points: '',
            houseId: props.house.id
        }
    }


    submitChore = () => {
        console.log('SUBMITTING CHORE !!!')
        console.log(this.state)
        if (this.state.title  !== '' && this.state.description !== '' && this.state.points !== ''){
            const reqObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:  JSON.stringify(this.state)
              }
              fetch(`http://localhost:3000/chores`, reqObj)
              .then(resp => resp.json())
              .then(data => {
                  console.log(data)
                  this.props.add(data)
              })
        }

    }


    render() {
      return (
        <View style = {styles.container}>
                <TextInput maxLength={50}
                    placeholder={'TITLE'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ title: text})}
                    defaultValue = {this.state.title}
                />
                <Divider styleName="line" />
                <TextInput style={styles.text}
                    placeholder={'DESCRIPTION'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ description: text})}
                    defaultValue = {this.state.description}
                />
                 <Divider styleName="line" />
                <TextInput style={styles.text}
                    placeholder={'POINTS'}
                    style = {styles.input}
                    onChangeText = {text => this.setState({ points: text})}
                    defaultValue = {this.state.points}
                />
                 <Divider styleName="line" />
                 <View styleName="horizontal">
                    <Button onPress = {this.submitChore} styleName="confirmation secondary" style={styles.button} >
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
        house: state.house, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: data => dispatch(addTask(data)),
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(AddChore)