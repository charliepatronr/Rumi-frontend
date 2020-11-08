/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from '../components/HomeFeed';
import Chore from '../components/Chore';
import Roomie from '../components/Roomie'
import { Button, View, Text} from '@shoutem/ui';


const Stack = createStackNavigator();

export default function HomeFeedStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'home-feed'
            component= {HomeFeed}
            options = {{
                headerTitle: () => <Text>HOME</Text>,
                headerRight: () => (
                    <Button
                      onPress={() => alert('This is a button!')}
                      color="#fff"
                    ><Text>Hello</Text></Button>)
            }}
      
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
