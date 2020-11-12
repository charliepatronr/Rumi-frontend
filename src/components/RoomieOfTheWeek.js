import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import Loading from './Loading'
import { Rating, Icon} from 'react-native-elements'
import Modal from './Modal'
import { completeTask } from '../actions/fetchChoresAction'
import { Button, View, Text, TouchableOpacity, Image, Divider, Row, Subtitle, Caption, ActivityIndicator, Title} from '@shoutem/ui';


class RoomieOfTheWeek extends React.Component {
    constructor(props) {
        super()
        this.state = {
            roomie: null,
        }
    }

    componentDidMount() {
        let id = parseInt(this.props.rof, 10);
        console.log('MOUNTED BITCH')
        console.log(id, 'ID')


        if( id ){
            fetch(`http://localhost:3000/users/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response, 'RESPONSE !!!!!!!')

                this.setState({
                    roomie: response
                })
    
            })
        } else {
            this.setState({
                roomie : 'no roomie'
            })
        }

    }

    render(){
        
        if (!this.state.roomie){
            return <Loading isVisible = {true} text= 'LOADING'/>
        } else if (this.state.roomie === 'no roomie'){
            return (
                <View styleName='horizontal h-center'>
                    <Title styleName='bold' >NO RUMI OF THE WEEK </Title>
                </View>
            )

        } else {
            return (
                <View styleName='vertical h-center md-gutter-vertical' style={styles.main}>
                    <View >
                        <Title styleName='bold' >RUMI OF THE WEEK </Title>
                    </View>
                <View styleName='v-center'>
                    {this.state.roomie ? ( <UserInfo user= { this.state.roomie } /> ) : null }
                </View>
      
            </View>
            )
        }
    }

}


const mapStateToProps = (state) => {
    return {
        house: state.house, 
    }
}

export default connect(mapStateToProps, null)(RoomieOfTheWeek)



const UserInfo = (props) => {
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'
    const {name, email, admin, img, historical_points, username, sprint_chores } = props.user
    return (
            <View >
                <View >
                    <View styleName = 'vertical v-center' >
                    <Icon type="material-community" name="crown" size = {80} />
                        <Image style ={styles.img}
                        resizeMode= 'cover'
                        PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                        source={
                            img
                            ? {uri: img}
                            : {uri: profileImg}
                        }
                        />
                    </View>
                    <View styleName='vertical h-center' >
                        <Subtitle styleName='bold'>{name.toUpperCase()}</Subtitle>
                        <Text> All time points: {historical_points}</Text>
                        {/* <Text style = {styles.userDescription}>{username}</Text> */}
                    </View>
                </View>
            </View>

    )

} 

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff', 
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    }
})