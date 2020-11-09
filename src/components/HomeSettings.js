import React from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { Button, View, Text, TouchableOpacity, Image, ImageBackground, Tile, Overlay, Caption, Title} from '@shoutem/ui';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import ListRoomies from './ListRoomies'
import ListHome from './ListChoresHome'
import ListChoresHome from './ListChoresHome';
import { Icon } from 'react-native-elements'
import Modal from './Modal'
import AddChore from "./AddChore";







class HomeSettings extends React.Component {
    constructor() {
        super()
        this.state = {
            showRoomies: true, 
            showChores: false, 
            roomieButton: "confirmation secondary", 
            choreButton: "confirmation", 
            renderComponent: null, 
            showModal: false, 
        }
    }

    showChores = () => {
        this.setState({
            showRoomies : false,
            roomieButton:  "confirmation", 
            choreButton: "confirmation secondary"
        })
    }

    showRoomies = () => {
        this.setState({
            showRoomies : true, 
            roomieButton:  "confirmation secondary", 
            choreButton: "confirmation"
        })
    }


    showModal = () => {
        this.setState({
            showModal: true
        })
    }

     closeModal = () =>{
         this.setState({
             showModal: false
         })
     }

     selectedComponent = (key) => {
        let value
         switch (key) {
             case 'displayKey':
                 value = (
                    <ImageBackground
                    style = {styles.imgBack}
                    source={{ uri: this.props.house.img }}
                    >
                    <Tile>
                      <Overlay>
                        <Title styleName="md-gutter-bottom"> HOUSE KEY</Title>
                        <Caption><Icon type="material-community" name="key-variant" size = {30} color ='white'/></Caption>
                        <Title>1565654651</Title>
                        {/* <Caption>185 Sutter St, San Francisco, CA 94109</Caption> */}
                      </Overlay>
                    </Tile>
                  </ImageBackground>
                 )
                 this.showModal()
                 this.setState({
                     renderComponent: value
                 })
                 break;
            case 'addChore':
                value = <AddChore house={this.props.house.id}/>
                this.showModal()
                this.setState({
                    renderComponent: value
                })
                break;
            default: 
                this.setState({
                    renderComponent: null, 
                    showModal: false
                })
                break;

         }
     }


    render() {
        const display = !this.state.showRoomies ? "flex" : "none";
        return(
            <View>
                <View style={styles.houseImage} >
                    <TouchableOpacity style ={styles.icon} onPress = {()=> this.selectedComponent('displayKey')}>
                        <Icon type="material-community" name="key-variant" size = {22} />
                    </TouchableOpacity>
                    <Image style ={styles.img}
                    PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                    source={
                        this.props.house.img
                        ? {uri: this.props.house.img}
                        : {uri: '' }
                    }
                    />
                    <TouchableOpacity style ={styles.icon} onPress = {()=> this.selectedComponent('addChore')}>
                        <Icon type="material-community" name="plus" size = {22} />
                    </TouchableOpacity>
                </View>

            

                    <View styleName="horizontal">
                        <Button  styleName={this.state.roomieButton} onPress = {() => this.showRoomies()}>
                            <Text> RUMIES </Text>
                        </Button>
                        <Button styleName={this.state.choreButton} onPress ={() => this.showChores()}>
                            <Text> CHORES </Text>
                        </Button>
                    </View>
                <View>
                    {this.state.showRoomies ? <ListRoomies roomies = {this.props.roomies}/> : <ListChoresHome chores ={this.props.chores} /> }
                </View>
                <Modal isVisible={this.state.showModal} setIsVisible = {this.closeModal}>
                    <SafeAreaView>
                        {this.state.renderComponent}
                    </SafeAreaView>
                </Modal>
            </View>

        )

    }


}


const mapStateToProps = (state) => {
    return {

        chores: state.chores,
        house: state.house, 
        roomies: state.roomies, 
        user: state.auth, 
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchChores: house => dispatch(fetchHouseChores(house)),
//     };
//   };



export default connect(mapStateToProps, null)(HomeSettings)


const styles =  StyleSheet.create( {
    houseImage : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    }, 
    img: {
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: 'black',
        marginLeft: 35, 
        marginRight: 25
    },
    icon : {
        marginLeft: 35, 
        marginRight: 25,
    }, 
    imgBack: {
        width: '100%', 
        height: 375
    }
})