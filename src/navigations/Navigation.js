/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import SprintStack from './SprintStack'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator();

export default function Navigation () {

    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='home'
            tabBarOptions={{
                inactiveTintColor:'#646464',
                activeTintColor: 'black'
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => screenOptions(route, color)
            })}
            >
                <Tab.Screen name="home" component={HomeStack} options={{title: 'House'}}/>
                <Tab.Screen name= "sprint-feed" component={SprintStack} options={{title: 'Sprint'}} />
                <Tab.Screen name= "profile" component={ProfileStack} options ={{title: 'Profile'}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


function screenOptions(route, color) {
    let iconName;

    switch (route.name){
        case 'home':
            iconName='home-plus';
            break;

        case 'sprint-feed':
            iconName = 'exit-run'
            break;

        case 'profile':
            iconName = 'account-settings'
            break; 
        default:
        break;
    }
    return (
        <Icon type="material-community" name={iconName} size = {22} color ={color} />
    );
}
