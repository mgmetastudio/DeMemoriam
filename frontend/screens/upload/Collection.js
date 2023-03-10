import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../constants";
import axios from 'axios';
import { getApiConfig } from '../../functions/api';

var width = Dimensions.get('window').width - 40;

const Collection = ({handleSelectCollection, collection, error}) => {

  console.log(collection);

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Select collection to which you {"\n"} would like to add story</Text>
      </View>
      <View style={styles.list}>
        <Pressable style={[styles.selectedCollection, !collection ? styles.active : null]} onPress={() => handleSelectCollection()}>
            <View style={styles.greenContainer}>
                <Text style={[styles.listTitle, !collection ? styles.active : null]}>Life Story collection</Text>
                <Text style={[styles.listText, !collection ? styles.active : null]}>Upload story about yourself, like hobbies or biggest life’s achievements</Text>
            </View>
        </Pressable>
      </View>
      <View>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.logo}>
        <Text style={styles.title2}>More collections coming soon ...</Text>
      </View>
  </View>
  )
}

export default Collection

const styles = StyleSheet.create({
        wrapper: {
            marginLeft: 16,
            marginRight: 16,
        },
        logo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            textAlign: "center"
        },
        title: {
            fontSize: 26,
            fontFamily: FONTS.preety,
            color: COLORS.white,
            textAlign: "center",
        },
        title2: {
          fontSize: 16,
          fontFamily: FONTS.regular,
          color: COLORS.gray,
          textAlign: "center",
          marginBottom: 15
      },    
        list: {
          alignSelf: 'stretch',
        },
        listTitle: {
            color: COLORS.black,
            fontFamily: FONTS.medium,
            textAlign: "center",
            fontSize: 16,
            marginBottom: 5
          },
        listText: {
          color: COLORS.black,
          fontFamily: FONTS.regular,
          textAlign: "center",
          fontSize: 14
        },
        errorMessage:  {
            fontSize: 14,
            fontFamily: FONTS.regular,
            color: COLORS.error,
        },
        selectedCollection: {
            backgroundColor: "rgba(117, 233, 187, 1)",
            alignSelf: 'stretch',
            borderRadius: 5,
            padding: 24,
            marginTop: 24,
            borderWidth: 1,
            borderColor: COLORS.gray
        },
        active: {
            color: COLORS.gray,
            backgroundColor: "transparent"
        },
        error: {
          paddingTop: 10,
          color: COLORS.error,
        }
})