/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Sprint from '../components/SprintFeed'
import Chore from '../components/Chore';
import Roomie from '../components/Roomie'
import { Button, View, Text, Title} from '@shoutem/ui';


const Stack = createStackNavigator();

export default function SprintStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'sprint'
            component= {Sprint}
            options = {{
                headerTitle: () => <Text>SPRINT</Text>,
            }}
            />
            <Stack.Screen
            name='chore'
            component={Chore}
            options = {{
                headerTitle: () => <Text>CHORE</Text>,
                headerBackTitle: () => <Text>SPRINT</Text>,
            }}
            />
            <Stack.Screen 
            name='roomie-profile'
            component={Roomie}
            options = {{
                headerTitle: () => <Text styleName='bold'>RUMI</Text>,
                headerBackTitle: () => <Text>SPRINT</Text>,
            }}
            />
        </Stack.Navigator>
    )
}
