import React, {useState, useEffect} from 'react'
import { View, Text , StyleSheet, Image, ScrollView} from 'react-native';
import {getMovieById} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constans';
import ModalVideo from '../components/ModalVideo';

export default function Movie({route}) {
    const {id} = route.params;

    const [movie, setMovie] = useState(null)

    const [showVideo, setShowVideo] = useState(false)

   // alert(movie.poster_path)
    
    useEffect(() => {
       getMovieById(id).then((response)=>{
           setMovie(response);
        console.log(response.poster_path);
       })
    }, [])

    if(!movie) return null
   
    return (
        <>
         <ScrollView>
           <MovieImage  posterPath={movie && movie.poster_path}/>
         </ScrollView>
         <ModalVideo show={showVideo} setShow={setShowVideo} />
        </>
    )
}

const MovieImage=({posterPath})=>{

    return(
       <View style ={styles.viewPoster}>
           <Image 
            source={{uri:`${BASE_PATH_IMG}/w500${posterPath}`}}  
            style={styles.poster}
           />
       </View>
    )
}

const styles = StyleSheet.create({
    viewPoster:{
      shadowColor:'#000',
      shadowOpacity:1,
      shadowRadius:10,
      shadowOffset:{
          width:0,
          height:10
      },
      
    },
    poster:{
      width:"100%",
      height:500,
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30
    }
})