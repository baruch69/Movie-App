import React , {useState, useEffect} from 'react'
import { View, Text , SafeAreaView, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, Platform, ScrollView} from 'react-native';
import {searchMovieApi} from '../api/movies';
import {Searchbar} from 'react-native-paper';
import {BASE_PATH_IMG}  from '../utils/constans';

const {width} = Dimensions.get("window");

export default function Search(props) {

    const [movies, setMovies] = useState(null)
    const [search, setSearch] = useState("")
    const {navigation} = props;

    useEffect(() => {
        if(search.length > 2){
            searchMovieApi(search).then((res)=>{
                setMovies(res.results);
            })
        }
        return () => {
            setMovies(null)
        }
    }, [search])

    return (
        <SafeAreaView>
           <Searchbar 
              placeholder="Busca tu pelicula"
              iconColor={Platform.OS ==="ios" && "transparent"}
              style={styles.input}
              icon="arrow-left"
              onChangeText={(e)=>setSearch(e)}
           />
           <ScrollView>
               <View style={styles.container}>
                    {movies && movies.map((movie, i)=>(
                        <Movie 
                          key={i}
                          movie={movie}
                          navigation={navigation}
                        />
                    ))}
               </View>
           </ScrollView>
        </SafeAreaView>
    )
}

function Movie(props){
    const {movie, navigation} = props;

    const gotoMovie=()=>{
      navigation.navigate('movie', {id: movie.id})
    }
   return(
       <TouchableWithoutFeedback
         onPress={gotoMovie}
       >
           <View style={styles.movie}>
               {movie.poster_path ?(
                    <Image 
                    style={styles.image}
                    source={{uri:`${BASE_PATH_IMG}/w500${movie.poster_path}`}}
                    />
               ): <Text>{movie.title}</Text>}
               
             
           </View>
       </TouchableWithoutFeedback>
   )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     flexDirection:"row",
     flexWrap:"wrap"
    },
    input:{
      
    },
    movie:{
     width:width / 2,
     height:300,
     alignItems:"center",
     justifyContent:"center"

    },
    image:{
        width:"100%",
        height:"100%"
    }
})
