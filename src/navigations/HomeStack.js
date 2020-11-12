/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from '../components/HomeFeed';
import Chore from '../components/Chore';
import Roomie from '../components/Roomie'
import HomeSettings from '../components/HomeSettings'
import { Button, View, Text} from '@shoutem/ui';
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'



const Stack = createStackNavigator();

export default function HomeFeedStack(){
    const navigation = useNavigation();

    const goToHomeSettings = () => {
        navigation.navigate('home-settings', {
            house: '',
        })
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = 'home-feed'
            component= {HomeFeed}
            options = {{
                headerTitle: () => <Text>HOME</Text>,
                headerBackTitle: () => <Text>HOME</Text>,
                headerRight: () => (
                    <Button
                      onPress={() => goToHomeSettings()}
                      color="#fff"
                    >
                       <Icon type="material-community" name="cogs" size = {22} />
                    </Button>)
            }}
      
            />
            <Stack.Screen
            name='chore'
            component={Chore}
            options = {{
                headerTitle: () => <Text>CHORE</Text>,
                headerBackTitle: () => <Text>HOUSE</Text>,
            }}
            />
            <Stack.Screen 
            name='roomie-profile'
            component={Roomie}
            options = {{
                headerTitle: () => <Text>RUMI</Text>,
                headerBackTitle: () => <Text>HOUSE</Text>,
            }}
            
            />
            <Stack.Screen 
            name='home-settings'
            component={HomeSettings}
            options = {{
                headerBackTitle: () => <Text>HOUSE</Text>,
                headerTitle: () => <Text>HOUSE STARK</Text>,
            }}
            />
        </Stack.Navigator>
    )
}
