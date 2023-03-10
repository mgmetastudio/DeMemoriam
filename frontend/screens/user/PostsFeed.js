import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'

var width = (Dimensions.get('window').width / 3) - 4;

const PostsFeed = ({myPosts, navigation}) => {
  return (
        <View style={styles.list}>
        {myPosts.sort((a, b) => (a.date_created < b.date_created) ? 1 : -1).map((x, index) => (
          <Pressable onPress={() => navigation.navigate("Post", x)}>
            <Image key={index} style={styles.image} source={{ uri: x.image }} />
          </Pressable>
        ))}
      </View>
  )
}

export default PostsFeed

const styles = StyleSheet.create({
    image: {
      width: width,
      height: width,
      margin: 2,
    },
    list: {
      display: "flex",
      flexDirection: "row"
    }
})