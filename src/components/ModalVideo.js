import React from 'react'
import { View, Text , StyleSheet } from 'react-native';
import {Modal, IconButton} from 'react-native-paper'

export default function ModalVideo({show, setShow}) {
    return (
        <Modal style={styles.modal} visible={show}>
           <Text>Modal</Text>
        </Modal>
    )
}

const styles = StyleSheet.create({
  modal:{
      backgroundColor:"#000",
      height:"130%",
      alignItems:"center",

      
  }
})
