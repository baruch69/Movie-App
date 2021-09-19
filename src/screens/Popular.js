import React, {useState, useEffect} from 'react'
import { View , StyleSheet, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Text, Title, Button} from 'react-native-paper'
import {getPopularMovieApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constans';
import noImage from '../assets/img/default-image.png';
import {Rating} from 'react-native-ratings';
import starDark from '../assets/img/starDark.png';
import starLight from '../assets/img/starLight.png';
import usePreferences from '../hooks/usePreferences';


export default function Popular(props) {
    const {navigation} =props;

    const [movies, setMovies] = useState(null)
    const [showButtomMore, setShowButtomMore] = useState(true)
    const [page, setPage] = useState(1);
    const {theme} = usePreferences();


    useEffect(() => {
        getPopularMovieApi(page).then((res)=>{
        const totalPages = res.total_pages;
        if(page < totalPages){
            if(!movies){
                setMovies(res.results)
            }else{
                setMovies([...movies, ...res.results])
            }
        }else{
            setShowButtomMore(false)
        }
           
        })
        
    }, [page])
 
    return (
        <ScrollView>
            {movies && movies.map((movie, i)=>{
                return(
                    <Movie  key={i} movie={movie} navigation={navigation}/>
                )
            })}
           {
               showButtomMore &&(
                <Button
                    mode="contained"
                    contentStyle={styles.moreContainer}
                    style={styles.loadMore}
                    labelStyle={{color: theme === "dark"  ? "#fff" : "#000" }}
                    onPress={()=>setPage(page + 1)}
               >
                   Cargar mas
               </Button>
               )
           }
        </ScrollView>
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
            <View style={styles.left}>
                <Image 
                  style={styles.image}
                  source={movie.poster_path?{uri:`${BASE_PATH_IMG}/w500${movie.poster_path}`}:noImage}
                  resizeMode="contain"
               />
            </View>
            <View style={styles.right}>
                <Title numberOfLines={1} style={styles.title}> {movie.title}</Title>
                <Text>{movie.release_date}</Text>
                <MovieRating  movieAverage={movie.vote_average} movieCount={movie.vote_count}/>
            </View>
        </View>
       </TouchableWithoutFeedback>
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
              imageSize={20}
              style={{marginRight:20}}
              
            />
            <Text style={{fontSize:12, color:"#8697a1"}}>{movieCount} votos</Text>
        </View>
    )

}


const styles = StyleSheet.create({
  movie:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15
  },
  left:{
      marginRight:20
  },
  image:{
      width:100,
      height:150
  },
  title:{
      fontSize:16,
      marginLeft:-5
  },
  right:{
      alignItems:"flex-start"
  },
  moreContainer:{
      paddingTop:10,
      paddingBottom:30
  },
  loadMore:{
      backgroundColor:"transparent"
  }
})


