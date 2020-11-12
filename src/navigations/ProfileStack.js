/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../components/Profile'
import AccountSettings from '../components/AccountSettings'
import { Button, View, Text} from '@shoutem/ui';
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'




const Stack = createStackNavigator();

export default function ProfileStack(){
    const navigation = useNavigation();

    const goToSettings = () => {
        navigation.navigate('account-settings')
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'profile'
            component= {Profile}
            options = {{
                headerTitle: () => <Text>PROFILE</Text>,
                headerRight: () => (
                    <Button
                      onPress={() => goToSettings()}
                      color="#fff"
                    >
                       <Icon type="material-community" name="cogs" size = {22} />
                    </Button>)
            }}
            />
            <Stack.Screen
            name = 'account-settings'
            component= {AccountSettings}
            options = {{title: 'Settings'}}
            />
        </Stack.Navigator>
    )
}
