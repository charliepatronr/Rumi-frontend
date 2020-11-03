/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Sprint from '../components/SprintFeed'


const Stack = createStackNavigator();

export default function SprintStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'sprint'
            component= {Sprint}
            options = {{title: 'Sprint'}}
            />
        </Stack.Navigator>
    )
}
