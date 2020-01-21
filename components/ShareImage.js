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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})
