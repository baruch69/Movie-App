import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search'
import {IconButton} from 'react-native-paper';


const Stack = createStackNavigator();


export default function StackNavigator(props){

    const buttonLeft=(screen)=>{

        switch(screen){
            case "search":
            case "movie":
              return(
                <IconButton 
                   icon="arrow-left"
                   onPress={()=>props.navigation.goBack()}/>
            )
            default:
              return(
                <IconButton 
                   icon="menu"
                   onPress={()=>props.navigation.toggleDrawer()}/>
            )
        }
        
    }


    const buttonRight=()=>{
        return(
            <IconButton
              icon="magnify"
              onPress={()=>props.navigation.navigate("search")}/>
        )
    }

    return(
        <Stack.Navigator>
           <Stack.Screen  
              name="home" 
              component={Home}
              options={{title:"Movie App",
                        headerLeft:()=> buttonLeft("home"),
                        headerRight:()=>buttonRight()
                    }}
            />
            <Stack.Screen  
              name="movie" 
              component={Movie}
              
              options={{title:"", headerTransparent:true,  headerLeft:()=> buttonLeft("movie"),
              headerRight:()=>buttonRight()
            }}
            />
            <Stack.Screen  
              name="news" 
              component={News}
              options={{title:"Nuevas Peliculas", headerLeft:()=> buttonLeft("news"),
              headerRight:()=>buttonRight()}}
            />
            <Stack.Screen  
              name="popular" 
              component={Popular}
              options={{title:"Peliculas populares", headerLeft:()=> buttonLeft("popular"), 
              headerRight:()=>buttonRight()}}
            />
            <Stack.Screen  
              name="search" 
              component={Search}
              options={{title:"",headerTransparent:true,  headerLeft:()=> buttonLeft("search"),
              }}
            />
        </Stack.Navigator>
    )
}