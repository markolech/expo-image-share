import React, { useState } from 'react'

import ShareImage from './components/ShareImage'
import SelectImage from './components/SelectImage'

// import logo from './assets/logo.png'

export default function App() {
  let [selectedImage, setSelectedImage] = useState(null)

  return selectedImage !== null ? (
    <ShareImage selectedImage={selectedImage} />
  ) : (
    <SelectImage setSelectedImage={setSelectedImage} />
  )
}
