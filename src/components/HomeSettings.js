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
import RoomieOfTheWeek from "./RoomieOfTheWeek";









class HomeSettings extends React.Component {
    constructor() {
        super()
        this.state = {
            showRoomies: true, 
            showChores: false, 
            renderComponent: null, 
            showModal: false, 
        }
    }

    showChores = () => {
        this.setState({
            showRoomies : false,
        })
    }

    showRoomies = () => {
        this.setState({
            showRoomies : true, 
        
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
                    resizeMode={'stretch'}
                    source={{ uri: this.props.house.img }}
                    >
                      <Overlay>
                        <Title styleName="md-gutter-bottom"> HOUSE STARK KEY</Title>
                        <Caption><Icon type="material-community" name="key-variant" size = {30} color ='white'/></Caption>
                        <Title>{this.props.house.id}</Title>
                        {/* <Caption>185 Sutter St, San Francisco, CA 94109</Caption> */}
                      </Overlay>
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
            case 'rumieOfTheWeek':
                value = <RoomieOfTheWeek rof={this.props.house.rof_week}/>
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
            <View style={styles.main}>
                <View style={styles.houseImage} >
                    <View styleName ='vertical v-center'>
                    <View styleName='md-gutter-vertical'>

                        <TouchableOpacity styleName = 'md-gutter-vertical' style ={styles.icon} onPress = {()=> this.selectedComponent('displayKey')}>
                            <Icon type="material-community" name="key-variant" size = {22} />
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity style ={styles.icon} onPress = {()=> this.selectedComponent('rumieOfTheWeek')}>
                            <Icon type="material-community" name="crown" size = {22} />
                        </TouchableOpacity>
                    </View>
                    <Image style ={styles.img}
                    PlaceholderContent = {<ActivityIndicator color = '#fff' />}
                    resizeMode={'stretch'}
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
                        <Button  styleName='confirmation secondary' onPress = {() => this.showRoomies()}>
                            <Text> RUMIS </Text>
                        </Button>
                        <Button styleName='confirmation secondary' onPress ={() => this.showChores()}>
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
    main: {
        backgroundColor: '#fff', 
        flex: 1
    },
    houseImage : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    }, 
    img: {
        width: 110,
        height: 90,
        borderRadius: 40,
        marginLeft: 35, 
        marginRight: 25
    },
    icon : {
        marginLeft: 35, 
        marginRight: 25,
    }, 
    imgBack: {
        width: '100%', 
        height: 375, 
    }
})