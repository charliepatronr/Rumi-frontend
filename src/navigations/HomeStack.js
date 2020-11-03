/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from '../components/HomeFeed';
import Chore from '../components/Chore';
import Roomie from '../components/Roomie'


const Stack = createStackNavigator();

export default function HomeFeedStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'home-feed'
            component= {HomeFeed}
            options = {{title: 'Home'}}
            />
            <Stack.Screen
            name='chore'
            component={Chore}
            />
            <Stack.Screen 
            name='roomie-profile'
            component={Roomie}
            />
        </Stack.Navigator>
    )
}
