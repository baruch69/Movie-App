import React ,{useEffect, useState}  from 'react'
import { View,  Dimensions, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text, Title} from 'react-native-paper';
import { BASE_PATH_IMG} from '../utils/constans';
import {getGenreApi} from "../api/movies";
import {useNavigation} from '@react-navigation/native'

const {width}= Dimensions.get("window");
const ITEM_WITDH = Math.round(width * 0.7)

export default function CarouselVertical({data}) {
     
  

    return (
        <Carousel 
          layout={"default"}
          data={data}
          renderItem={(item)=><RenderItem  data={item}/>}
          sliderWidth={width}
          itemWidth={ITEM_WITDH}
        />
    )
}

function RenderItem(props){

    const {data} = props
    const {title, poster_path, genre_ids, id}  =data.item;

    const navigation = useNavigation()

    const [genres, setGenres] = useState([])

      
    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
     useEffect(() => {
      getGenreApi(genre_ids).then((response)=>{
        setGenres(response)
      })
     }, [])

  
    const onNavigation=()=>{
      navigation.navigate('movie', {id})
    }
    
    return(
        <TouchableWithoutFeedback
          onPress={()=>onNavigation()}
        >
          <View styles={styles.card}>
              <Image 
                style={styles.image}
                source={{uri:imageUrl}}
              />
              <Text style={styles.title}>{title}</Text>
              <View style={styles.genres}>
                  {genres &&
                        genres.map((gener, index)=>(
                          <Text key={index} style={styles.gen}>
                            {gener}
                            {index !== genres.length - 1 && ", "}
                          </Text>
                        ))
                  }
              </View>
          </View>
        </TouchableWithoutFeedback>
    )
}

const styles= StyleSheet.create({
    card:{
     shadowColor:'#000',
     shadowOffset:{
         width:0,
         height:10
     },
     shadowOpacity:1,
     shadowRadius:10
    },
    image:{
        width:'100%',
        height:370,
        borderRadius:20
    },
    title:{
      fontSize:18,
      alignSelf:"center",
      marginTop:10
    },
    genres:{
      flexDirection:"row",
      marginTop:10
     
    },
    gen:{
      fontSize:14,
      color:"#6967a5"
    }
})


