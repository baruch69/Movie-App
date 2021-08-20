import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {getNewsMoviesApi, getAllGeneresApi} from '../api/movies'
import CarouselVertical from '../components/CarouselVertical'
import { Title} from 'react-native-paper'

export default function Home() {


const [newMovies, setNewMovies] = useState(null);
const [genresList, setGenresList] = useState([]);

const [genreSelected, setGenreSelected] = useState(28)

useEffect(() => {
    getNewsMoviesApi().then((response)=>{
       setNewMovies(response.results)     
    })
}, [])  

useEffect(() => {
  getAllGeneresApi().then((response)=>{
      setGenresList(response.genres )
  })
}, [])


const onChangeGenre=(newGenreId)=>{
    setGenreSelected(newGenreId)
}

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
            {newMovies && (
                <View style={styles.news}>
                    
                    <CarouselVertical data={newMovies}/>
                </View>
            )}
            <View style={styles.genres}> 
                <Title style={styles.genresTitle} > Peliculas por generos</Title>
              
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.genreList}
                >
                     {genresList.map((gen)=>{
                         return(
                             <Text 
                               key={gen.id}
                               onPress={()=> onChangeGenre(gen.id)}
                               style={[styles.title, {color: gen.id != genreSelected ? "#8697a5": "#fff"}]} >{gen.name}</Text>
                         )
                     })}
                </ScrollView>
           
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news:{
        marginTop:10
    },
    newsTitle:{
        marginHorizontal:20,
        fontSize:20,
        fontWeight:"bold",
        marginBottom:15
    },
    genres:{
        marginTop:0,
        marginBottom:50
    },
    genresTitle:{
       fontSize:20,
       fontWeight:"bold"
    },
    genreList:{
        marginBottom:15,
        marginTop:5,
        padding:10
    },
    title:{
        marginRight:5,
        fontSize:16
    }
})
