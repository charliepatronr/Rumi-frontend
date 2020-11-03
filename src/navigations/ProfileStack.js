/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../components/Profile'


const Stack = createStackNavigator();

export default function ProfileStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'profile'
            component= {Profile}
            options = {{title: 'Profile'}}
            />
        </Stack.Navigator>
    )
}
