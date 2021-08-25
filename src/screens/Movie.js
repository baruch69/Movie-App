import React, {useState, useEffect} from 'react'
import { View, Text , StyleSheet, Image} from 'react-native';
import {getMovieById} from '../api/movies';

export default function Movie({route}) {
    const {id} = route.params;

    const [movie, setmovie] = useState(null)

    useEffect(() => {
       getMovieById(id).then((response)=>{
           setmovie(response)
       })
    }, [])

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

const MovieImage=({posterPath})=>{

    return(
       <Image 
         source={{uri: posterPath}}  
       />
    )
}
