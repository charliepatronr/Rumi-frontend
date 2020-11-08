/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import Loading from './Loading'
import { Rating} from 'react-native-elements'
import { Button, View, Text} from '@shoutem/ui';
import Modal from './Modal'
import { completeTask } from '../actions/fetchChoresAction'

class Chore extends React.Component {
    constructor(props) {
        super()
        this.state = {
            chore: null,
            user: null,
            rating: 0,
            completionStatus: false,
            showModal: false, 
    
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/sprint_chores/${this.props.route.params.id}`)
        .then(response => response.json())
        .then(response => {
            // debugger
            // let completionStatus;
            // let review;
            // let sprintChore;
            // let user;
            // response.sprint_chores.map (chore =>{
            //     if (chore.sprint_id === 1) {
            //         completionStatus = chore.completion_status
            //         review = chore.review
            //         sprintChore = chore.chore_id
            //         user = chore.user_id
            //     }
            // })

            this.setState({
                chore: response.chore,
                rating: response.review,
                user: response.user,
                completionStatus: response.completion_status,
            })

        })
    }

    complete = () => {
        this.setState({
            showModal: true
        })
    }

     closeModal = () =>{
         this.setState({
             showModal: false
         })
     }

     confirmCompletion = () => {
         console.log(this.state.chore)
         let data = {
            completion_status: true, 
        }

        const configObj = {
            method: 'PATCH', 
            headers : {
              'Content-Type' : 'application/json', 
              'Accept' : 'application/json'
            }, 
            body: JSON.stringify(data)
          }
         fetch(`http://localhost:3000/sprint_chores/${this.props.route.params.id}/complete`, configObj)
         .then(response => response.json())
         .then(response => {
             console.log(response)
            this.props.completeChore(response)
            this.closeModal()
            });
     }

    render(){
        const { navigation, route } = this.props
        const { id, title} = route.params;
        // const [chore, setChore] = useState(null)

        navigation.setOptions({
            title: title,
        })
        if (!this.state.chore){
            return <Loading isVisible = {true} text= 'LOADING'/>
        }

        return (
            <View>
                <ChoreInfo chore={this.state.chore} completion = {this.state.completionStatus} rating= {this.state.rating}/>
                {this.state.user.id === this.props.user.id ?
                    <View>
                        <Button styleName="secondary"  onPress = { () => this.complete()}>
                            <Text> COMPLETE TASK</Text>
                        </Button>
                    </View> :
                    null
                }
                <Modal isVisible={this.state.showModal} setIsVisible = {this.closeModal}>
                    <Text> ARE YOU SURE YOU COMPLETED THE TASK? </Text>
                    <ChoreInfo chore={this.state.chore} completion = {this.state.completionStatus} rating= {this.state.rating}/>
                    <View styleName="horizontal">
                            <Button  styleName="confirmation secondary" onPress = {() => this.confirmCompletion()}>
                                <Text>YES</Text>
                            </Button>
                            <Button styleName="confirmation secondary" onPress ={() => this.closeModal()}>
                                <Text>NO</Text>
                            </Button>
                    </View>

                </Modal>
            </View>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeChore: data => dispatch(completeTask(data)),
    };
  };



  export default connect(mapStateToProps, mapDispatchToProps)(Chore)


const ChoreInfo = (props) => {
    const {title, description, points } = props.chore

    return (
        <View style={styles.viewChoreTitle}>
            <View style={ {flexDirection: 'row'}}>
                <Text style= {styles.choreTitleText}>{title}</Text>
            </View>
            <Text style={styles.descriptionChore}>{description} </Text>
            <Text style={styles.descriptionChore}>Points: {points}</Text>
            {props.completion ?  <Rating style ={styles.rating} imageSize = {20} startingValue ={props.rating}/> : null }
        </View>
    )

} 


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewChoreTitle : {
        padding:  15,
    },
    choreTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionChore:{
        marginTop: 5, 
    }, 
    rating: {
        alignItems: 'center', 
        justifyContent: 'center'
    }
});