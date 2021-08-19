import React, {useState} from 'react'
import { View,  StyleSheet } from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import usePreference from "../hooks/usePreferences";
import { ThemeProvider } from '@react-navigation/native';
import Colors from '../constans/Colors';

export default function DrawerContent(props) {

    const [active, setActive] = useState("home")
    const {navigation}= props;

    const  {theme, toggleTheme} = usePreference();


    const onChangeScreen=(screen)=>{
       setActive(screen)
       navigation.navigate(screen)
    }
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                
                label="Inicio" active={active === "home"} theme={theme}
                onPress={()=>onChangeScreen("home")}
                />
                <Drawer.Item
                label="Peliculas populares" active={active === "popular"} theme={theme}
                onPress={()=>onChangeScreen("popular")}
                />
                <Drawer.Item
                label="Nuevas peliculas" active={active === "news"}
                onPress={()=>onChangeScreen("news")}
                />
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style ={styles.preference}>
                        <Text>Tema Oscuro</Text>
                        <Switch  value={theme === "dark"}  onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const theme={
    colors:{
        primary:"orange"
    }
}

const styles =StyleSheet.create({
    preference:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
        paddingHorizontal:16,
        paddingVertical:12
    }
})
