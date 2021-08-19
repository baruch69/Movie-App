import React, {useMemo, useState} from 'react'
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme  as DefaultThemePaper} from 'react-native-paper';
import {NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation} from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar} from 'react-native';
import PreferenceContext from './src/context/PreferenceContext';

export default function App() {

  DefaultThemePaper.colors.background ='#1ae1f2';
  DarkThemePaper.colors.primary ='#1ae1f2';
  DarkThemePaper.colors.accent ='#1ae1f2';

  DarkThemeNavigation.colors.background='#192734'
  DarkThemeNavigation.colors.card='#15212b';

  const [theme, setTheme] = useState("light");
  
  const toggleTheme=()=>{
    setTheme(theme === "dark" ? "light" : "dark")
  }
 
  const preference = useMemo(
    ()=>({
      toggleTheme,
      theme
    }),
    [theme]
  )

  return (
  <PreferenceContext.Provider value={preference}>
    <PaperProvider theme={theme === "dark" ? DarkThemePaper :DefaultThemePaper}>
      <NavigationContainer theme={theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
         <StatusBar barStyle={theme === "dark" ? "light-content" :"dark-content"}/>
         <AppNavigator/>
      </NavigationContainer>
    </PaperProvider>
  </PreferenceContext.Provider>
  )
}
