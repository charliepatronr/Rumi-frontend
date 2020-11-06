/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Sprint from '../components/SprintFeed'
import Chore from '../components/Chore';
import Roomie from '../components/Roomie'


const Stack = createStackNavigator();

export default function SprintStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'sprint'
            component= {Sprint}
            options = {{title: 'Sprint'}}
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
