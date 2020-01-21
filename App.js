import React, { useState } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import uploadToAnonymousFilesAsync from 'anonymous-files'

import ShareImage from './components/ShareImage'

import logo from './assets/logo.png'

export default function App() {
  let [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) {
      return
    }

    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri)
      setSelectedImage({ localUri: pickerResult.uri, remoteUri })
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null })
    }
  }

  return selectedImage !== null ? (
    <ShareImage selectedImage={selectedImage} />
  ) : (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/TkIrScD.png' }}
        style={styles.logo}
      />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  )
}

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
