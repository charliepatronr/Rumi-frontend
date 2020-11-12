import React from "react";
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import Loading from './Loading'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, View, Text, ListView, Divider, Tile, Title, Caption, Subtitle, Row} from '@shoutem/ui';
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import { logoutSuccess } from '../actions/auth'





class AccountSettings extends React.Component {
    constructor() {
        super()
        this.state = {
            chores: null
        }
    }

    logOutApp = () => {
        this.props.logout()
    }


    render() {
        const menuOptions = generateOptions();
        return (
            <View style={styles.main}>
                <View styleName='md-gutter-vertical'>
                    <UserInfo user ={this.props.user}/>
                </View>
                {map(menuOptions, (menu, index) => (
                    <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                    />
                ))}
                <View styleName="horizontal h-center">
                    <Button styleName="secondary md-gutter-vertical"  onPress = { () => this.logOutApp()}>
                        <Text> LOGOUT</Text>
                    </Button>
                </View>
        
              {/* <Loading text={loadingText} isVisible={loading} /> */}
            </View>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: data => dispatch(logoutSuccess(data)),
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)

const UserInfo = (props) => {
    const profileImg = 'https://freesvg.org/img/abstract-user-flat-4.png'
    const {name, email, admin, img, historical_points, username, sprint_chores } = props.user
    return (
            <View>
                <View styleName='vertical h-center'>
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
                    <Text>{email}</Text>
                </View>
            </View>

    )

} 

function generateOptions() {
    return [
      {
        title: "Change Name",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
    
      },
      {
        title: "Change Email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        
      },
      {
        title: "Change password",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
      },
    ];
  }



const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
      },
      main: {
        backgroundColor: '#fff', 
        flex: 1
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 60,
    }, 

});

