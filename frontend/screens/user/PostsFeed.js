import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

var width = Dimensions.get('window').width / 3;

const PostsFeed = ({posts}) => {
  return (
    <View>
        <View style={styles.list}>
           <Image style={styles.image} source={{ uri: posts.image }} />
      </View>
    </View>
  )
}

export default PostsFeed

const styles = StyleSheet.create({
    image: {
        width: width,
        height: width,
      },
})