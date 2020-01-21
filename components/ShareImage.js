import React, { useState } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import * as Sharing from 'expo-sharing'

import styles from '../styles/styles'

const ShareImage = props => {
  let openSharedialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${props.selectedImage.remoteUri}`
      )
      return
    }
    Sharing.shareAsync(
      props.selectedImage.localUri || props.selectedImage.localUri
    )
  }

  if (props.selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: props.selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openSharedialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo mate!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ShareImage
