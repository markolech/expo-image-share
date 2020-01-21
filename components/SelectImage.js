import React, { useState } from 'react'

import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import uploadToAnonymousFilesAsync from 'anonymous-files'

import * as ImagePicker from 'expo-image-picker'

import styles from '../styles/styles'

const SelectImage = ({ setSelectedImage }) => {
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

  return (
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

export default SelectImage
