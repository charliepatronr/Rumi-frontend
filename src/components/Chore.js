/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from './Loading'
import { Rating} from 'react-native-elements'

class Chore extends React.Component {
    constructor(props) {
        super()
        this.state = {
            chore: null,
            user: null,
            rating: 0,
            completionStatus: false,
        }
    }

    componentDidMount() {
        console.log(this.props.route.params.id)
        fetch(`http://localhost:3000/sprint_chores/${this.props.route.params.id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
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

    render(){
        const { navigation, route } = this.props
        const { id, title} = route.params;
        // const [chore, setChore] = useState(null)
        console.log(this.state.chore)

        navigation.setOptions({
            title: title,
        })
        if (!this.state.chore){
            return <Loading isVisible = {true} text= 'LOADING'/>
        }

        return (
            <View>
                <ChoreInfo chore={this.state.chore} completion = {this.state.completionStatus} rating= {this.state.rating}/>
            </View>
        )

    }

}

export default Chore


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