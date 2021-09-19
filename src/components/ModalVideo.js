import React, {useEffect, useState} from 'react'
import {  StyleSheet, Dimensions, Platform } from 'react-native';
import {Modal, IconButton} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import {WebView} from 'react-native-webview'
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
          {Platform.OS === 'ios'?(
               <YouTube videoId={video}  style={styles.video}/>
          ):(
               <WebView  style={{width:400, height:400}} 
                source={{uri:`https://www.youtube.com/embed/${video}?controls=0&showinfo=0`}} />
          )}
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
      marginBottom:300
  },
  video:{
      alignSelf:"stretch",
      height:320,
      width:width * .9,
      marginBottom:50
  }
})
