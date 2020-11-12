/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import Signup from '../components/Signup';
import JoinOrCreateHouse from '../components/JoinOrCreateHouse';




const Stack = createStackNavigator();

export default function LoginStack(){
    
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'landing-page'
            component= {LandingPage}
            options = {{
                headerTitle: () => null,
            }}
      
            />
            <Stack.Screen
            name='login'
            component={Login}
            options = {{
                headerTitle: () => null,
                headerBackTitle: () => <Text>HOME</Text>,
            }}
            />
            <Stack.Screen 
            name='signup'
            component={Signup}
            options = {{
                headerTitle: () => null,
                headerBackTitle: () => <Text>Back</Text>,

            }}
            />
            <Stack.Screen 
            name='join-or-create-house'
            component={JoinOrCreateHouse}
            options = {{
                headerTitle: () => null,
                headerBackTitle: () => <Text>Back</Text>,
            }}
            />
            
        </Stack.Navigator>
    )
}
