import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView} from 'react-native';
import {getMovieById} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constans';
import ModalVideo from '../components/ModalVideo';
import {Text, IconButton, Title} from 'react-native-paper'
import {Rating} from 'react-native-ratings';
import starDark from '../assets/img/starDark.png';
import starLight from '../assets/img/starLight.png';
import usePreferences from '../hooks/usePreferences';


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
         <ScrollView showsVerticalScrollIndicator={false}>
           <MovieImage  posterPath={movie && movie.poster_path}/>
           <MovieTrailer  setShowVideo={setShowVideo}/>
           <MovieTitle movie={movie} />
           <MovieRating  movieAverage={movie.vote_average} movieCount={movie.vote_count}/>
           <Text style={styles.overview}>{movie.overview}</Text>
           <Text style={[styles.overview, {marginBottom:30}]}>Fecha de lanzamiento {movie.release_date}</Text>
         </ScrollView>
         <ModalVideo show={showVideo} setShow={setShowVideo}  idMovie={id}/>
        </>
    )
}

function MovieTitle(props){
  const {movie} = props;
  return(
      <View style ={styles.info}> 
         <Text style={styles.title}>{movie.title}</Text>
         <View style={styles.movieGenrs}>
             {movie.genres.map((genres)=>(
                 <Text style={{marginRight:5, color:"#8697a5"}} key={genres.id}>{genres.name}</Text>
             ))}
         </View>
      </View>
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

function MovieTrailer({setShowVideo}){
    return(
        <View style={styles.viewPlay}> 
            <IconButton 
              icon="play"
              color="#000"
              size={30}
              style={styles.play}
              onPress={()=>setShowVideo(true)}
            />
        </View>
    )

}

function MovieRating(props){
    const {movieAverage, movieCount} = props;
    const media = movieAverage /2;
    const {theme} = usePreferences();

    return(
        <View style={styles.viewRating}>
            
            <Rating 
              type="custom"
              ratingImage={theme === "dark" ? starDark : starLight}
              ratingColor ="#ffc205"
              ratingBackgroundColor={theme === "dark" ? "#192734": "#f0f0f0f0"}
              startingValue={media}
              imageSize={30}
              style={{marginRight:20}}
              
            />
            <Text style={{fontSize:16}}>{media}</Text>
            <Text style={{fontSize:12, color:"#8697a1", marginLeft:20}}>{movieCount} votos</Text>
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
      borderBottomRightRadius:30,
     
    },
    play:{
     backgroundColor:"#fff",
     marginTop:-30,
     marginRight:20
    },
    viewPlay:{
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    info:{
        marginHorizontal:60
    },
    movieGenrs:{
        flexDirection:'row'
    },
    title:{
     fontWeight:"bold",
     fontSize:18
    },
    viewRating:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:30,
        marginTop:10
    },
    overview:{
        marginHorizontal:30,
        marginTop:20,
        textAlign:"justify",
        color:"#8697a1"
    }

})