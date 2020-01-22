import React, { useState } from 'react'

import Amplify from 'aws-amplify'
import amplify from './aws-exports'

import ShareImage from './components/ShareImage'
import SelectImage from './components/SelectImage'

// import logo from './assets/logo.png'

export default function App() {
  let [selectedImage, setSelectedImage] = useState(null)

  Amplify.configure(amplify)

  return selectedImage !== null ? (
    <ShareImage selectedImage={selectedImage} />
  ) : (
    <SelectImage setSelectedImage={setSelectedImage} />
  )
}
