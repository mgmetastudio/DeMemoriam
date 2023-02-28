import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, Alert } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState, useCallback } from 'react'
import { COLORS, FONTS } from "../../constants";
import * as ImagePicker from 'expo-image-picker';

const cancel = 
<Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7.85885 0.799972C7.9528 0.710194 7.99987 0.600391 8 0.470559C7.99987 0.340733 7.9528 0.228961 7.85885 0.135242C7.76904 0.0452166 7.6592 8.19331e-05 7.52941 0C7.39961 8.20802e-05 7.28781 0.0452166 7.19413 0.135242L4.00002 3.33526L0.800028 0.135242C0.710217 0.0452166 0.600382 8.19331e-05 0.470584 0C0.340791 8.20802e-05 0.228988 0.0452166 0.135307 0.135242C0.0452334 0.228959 0.000131092 0.34073 0 0.470559C0.000131294 0.600385 0.0452334 0.710182 0.135307 0.799972L3.3353 3.99999L0.135307 7.19412C0.0452334 7.28784 0.000131092 7.39961 0 7.52943C0.000131294 7.65926 0.0452334 7.76906 0.135307 7.85885C0.228991 7.95281 0.340802 7.99992 0.470584 8C0.600376 7.99992 0.710213 7.95281 0.800028 7.85885L4.00002 4.66472L7.19413 7.85885C7.28781 7.95281 7.39962 7.99992 7.52941 8C7.6592 7.99992 7.76903 7.95281 7.85885 7.85885C7.9528 7.76907 7.99987 7.65927 8 7.52943C7.99987 7.39961 7.9528 7.28784 7.85885 7.19412L4.66474 3.99999L7.85885 0.799972Z" fill="white"/>
</Svg>


const Photos = ({image, setImage}) => {

  const pickImage = async () => {
    console.log('image upload function');
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.wrapper}>
    <View style={styles.logo}>
        <Text style={styles.title}>Now let's upload your profile photo, so our AI can make it alive</Text>
    </View>
    <Pressable style={styles.fileUpload}  onPress={pickImage}>
      <Text style={styles.fileUploadText}><Text style={{color: COLORS.green}}>Choose file</Text> to upload </Text>
      <Text style={styles.fileUploadFormat}>JPEG or PNG (up to 2 MB)</Text>
    </Pressable>
    <View style={styles.imagesContainer}>
          <Text style={styles.text}>Uploaded image</Text>
    </View>
    {image ? 
    <View style={styles.uploadedImage}>
        <Pressable onPress={() => setImage(null)} style={styles.iconWrapper} >{cancel}</Pressable>
        <Image style={styles.image} source={{ uri: image, width: 65, height: 65, }} />
    </View> : null }
  </View>
  )
}

export default Photos

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      textAlign: "center"
  },
  title: {
      fontSize: 20,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
},
  fileUpload: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 30

  },
  fileUploadText: {
    color: COLORS.white,
    fontSize: 18
  },
  fileUploadFormat: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 5
  },
  imagesContainer: {
    paddingTop: 25,
  },
  image: {
    borderRadius: "50%",
  },
  uploadedImage: {
    position: "relative",
    width: 65,
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(117, 233, 187, 1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    zIndex: 2,
    borderRadius: "50%",
  },
  text: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    fontSize: 14,
  }
})