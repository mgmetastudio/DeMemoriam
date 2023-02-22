import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const Post = ({navigation, route}) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>{ route.params.owner }</Text>
    </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({})