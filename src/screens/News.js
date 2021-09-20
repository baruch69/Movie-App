import React , {useState, useEffect} from 'react'
import { View , ScrollView, Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native'
import {Text, Button} from 'react-native-paper';
import {getNewsMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constans';
import  usePreferences from '../hooks/usePreferences'


const {width} = Dimensions.get('window');

export default function News(props) {

    const {theme} = usePreferences();
    const [movies, setMovies] = useState(null);
    const[page, setPage] = useState(1);
    const [showBtnMore, setShowBtnMore] = useState(true)
    const {navigation} =props;


    useEffect(() => {

        getNewsMoviesApi(page).then((res)=>{
            const totalPages = res.total_pages;
            if(page < totalPages){
                if(!movies){
                    setMovies(res.results)
                }else{
                    setMovies([...movies, ...res.results])
                }
            }else{
                setShowBtnMore(false)
            }
               
            })
        
    }, [page])
    return (
       <ScrollView>
          <View  style={styles.container}>
          {movies&& movies.map((movie, i)=>{
               return(
                   <Movie key={i} movie={movie}  navigation={navigation}/>
               )
           }) }
          </View>
          {showBtnMore && (
            <Button
             mode="contained"
             contentStyle={styles.moreContainer}
             labelStyle={{color: theme === "dark"  ? "#fff" : "#000" }}
             style={styles.loadMore}
             onPress={()=>setPage(page + 1)}
            >
                Cargar mas
            </Button>
          )}
       </ScrollView>
    )
}

function Movie(props){
   const {movie, navigation} =props;

   const gotoMovie=()=>{
    navigation.navigate('movie', {id: movie.id})
   }


    return(
       <TouchableWithoutFeedback
        onPress={gotoMovie}
       >
           <View style={styles.movie}>
             { movie.poster_path ?( <Image 
                 style={styles.image}
                 source={{uri:`${BASE_PATH_IMG}/w500${movie.poster_path}`}}
               /> ): <Text>{movie.title}</Text>}
               
           </View>
       </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    flexWrap:"wrap"
  },
   movie:{
    width:width/2,
    height:300,
    alignItems:"center",
    justifyContent:"center"
   },
   image:{
     width:"100%",
     height:"100%"
   },
   moreContainer:{
    paddingTop:10,
    paddingBottom:30
  },
  loadMore:{
    backgroundColor:"transparent",
    marginTop:-5
}
})
                                                                