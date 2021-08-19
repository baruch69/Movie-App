import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import DrawerContent from './DrawerContent';


const Drawer = createDrawerNavigator();


export default function AppNavigator(){
    return(
        <Drawer.Navigator drawerContent={(props)=><DrawerContent {...props}/>}>
            <Drawer.Screen name ="app" component={StackNavigator}/>
        </Drawer.Navigator>
    )
}