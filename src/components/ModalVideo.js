import React, {useEffect, useState} from 'react'
import {  StyleSheet, Dimensions } from 'react-native';
import {Modal, IconButton} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import {getVideoMovieApi} from '../api/movies';

const {width} = Dimensions.get("window");

export default function ModalVideo({show, setShow, idMovie}) {
   
     const [video, setVideo] = useState(null)

     useEffect(() => {
         getVideoMovieApi(idMovie).then((response)=>{
           
             let idVideo = null;
             response.results.forEach(video => {
                 if(video.site === "YouTube" && !idVideo){
                      idVideo = video.key
                 }
             });
             setVideo(idVideo)
             
         })
         
     }, [])

    return (
        <Modal style={styles.modal} visible={show}>
           <YouTube videoId={video}  style={styles.video}/>
           <IconButton 
             icon="close"
             onPress={()=>setShow(false)}
             style={styles.btnclose}
           />
        </Modal>
    )
}

const styles = StyleSheet.create({
  modal:{
      backgroundColor:"#000",
      height:"130%",
      alignItems:"center",  
  },
  btnclose:{
      backgroundColor:"#fff",
      alignSelf:"center",
      marginBottom:200
  },
  video:{
      alignSelf:"stretch",
      height:320,
      width:width * .9,
      marginBottom:50
  }
})
