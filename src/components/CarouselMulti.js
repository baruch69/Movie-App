import React from 'react'
import { View, Text, StyleSheet, Image,  Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constans';
import {useNavigation} from '@react-navigation/native'

const {width, height} = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width) * 0.3;

export default function CarouselMulti({data}) {

  

    return (
        <Carousel 
          layout="default"
          data={data}
          renderItem={(item)=><RenderItem  data={item}/>}
          sliderWidth={width}
          itemWidth={ITEM_WIDTH}
          firstItem={1}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
    )
}

const RenderItem=({data})=>{

    const {poster_path, title, id} = data.item

    const navigation = useNavigation();
    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`
     return(
         <TouchableWithoutFeedback
           onPress={()=>navigation.navigate("movie", {id})}
         >
             <View style={styles.card}>
               <Image 
                 source={{uri:imageUrl}}
                 style={styles.image}
               />
               <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</Title>
             </View>
         </TouchableWithoutFeedback>
     )
}

const styles = StyleSheet.create({
   card:{

       shadowColor:"#000",
       shadowOffset:{
           width:0,
           height:10
       },
       shadowRadius:10,
       shadowOpacity:1
   },
   image:{
       width:"85%",
       height:170,
       borderRadius:5
   },
   title:{
       marginTop:10,
       alignSelf:"center"
   }
})
