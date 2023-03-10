import { StyleSheet, Text, View, Image, Dimensions, Alert, Pressable } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern, Circle } from 'react-native-svg';
import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../constants";
import { getApiConfig } from '../functions/api';
import axios from "axios";
import moment from 'moment';


var width = Dimensions.get('window').width;

const Post = ({navigation, posts}) => {
    const dummyPosts = [
        {
          id: "NFT-01",
          owner: "Rysard",
          creator: "Rysard Gvozdovic",
          status: "Public",
          date: "12h",
          contract: "15rfe32f233f2cse...",
          blockchain: "Flow",
          standard: "ERC-721",
          collection: "Life Story collection",
          description:
            "My name is Ronald, and I am the CEO of WalkieBox. Everything you see and hear is real. A digital representation of my self, cloned by artificial intelligence ...",
          image: require("../assets/Images/nft-1.jpg"),
        },
        {
          id: "NFT-02",
          owner: "Kupiper_R",
          creator: "Ronald Kuiper",
          status: "Public",
          date: "12h",
          contract: "15rfe32f233f2cse...",
          blockchain: "Flow",
          standard: "ERC-721",
          collection: "Life Story collection",
          description:
            "My name is Ronald, and I am the CEO of WalkieBox. Everything you see and hear is real. A digital representation of my self, cloned by artificial intelligence ...",
          image: require("../assets/Images/nft-2.jpg"),
        },
        {
          id: "NFT-03",
          owner: "Rysard",
          creator: "Rysard Gvozdovic",
          status: "Public",
          date: "12h",
          contract: "15rfe32f233f2cse...",
          blockchain: "Flow",
          standard: "ERC-721",
          collection: "Life Story collection",
          description:
            "My name is Ronald, and I am the CEO of WalkieBox. Everything you see and hear is real. A digital representation of my self, cloned by artificial intelligence ...",
          image: require("../assets/Images/nft-1.jpg"),
        },
        {
          id: "NFT-04",
          owner: "Rysard",
          creator: "Rysard Gvozdovic",
          status: "Public",
          date: "12h",
          contract: "15rfe32f233f2cse...",
          blockchain: "Flow",
          standard: "ERC-721",
          collection: "Life Story collection",
          description:
            "My name is Ronald, and I am the CEO of WalkieBox. Everything you see and hear is real. A digital representation of my self, cloned by artificial intelligence ...",
          image: require("../assets/Images/nft-1.jpg"),
        },
       ];

       const more = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="16" cy="10" r="2" fill="white"/>
        <Circle cx="16" cy="16" r="2" fill="white"/>
        <Circle cx="16" cy="22" r="2" fill="white"/>
       </Svg>
      
  const getFullName = (date) => {
    let postDate = new Date(parseFloat(date * 1000));
    let day = postDate.getDate();
    let month = postDate.getMonth();
    let year = postDate.getFullYear();
    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    let seconds = postDate.getSeconds();
    let formatedDate = moment([year, month, day, hours, minutes, seconds]).fromNow(true)
    return formatedDate;
  };
  return (
    <View style={styles.list}>
        {posts.sort((a, b) => (a.date_created < b.date_created) ? 1 : -1).map((x, index) => (
            <View key={index} style={styles.postContainer}>
                <View style={styles.postTop}>
                  <View style={styles.postTopLeft}>
                    
                    <View style={styles.details}>
                      <Pressable onPress={() => navigation.navigate("User", x.creator)}> 
                        <Text style={styles.owner}>{ x.owner.username }</Text>
                      </Pressable>
                      <Text style={styles.info}>{getFullName(x.date_created)} · {x.access}</Text>
                    </View>
                  </View>
                  <View style={styles.postTopRight}>
                    <Pressable style={styles.icon} onPress={() => Alert.alert('This will show more details')}>
                      {more}
                    </Pressable>
                  </View>
                </View>
                <Pressable onPress={() => navigation.navigate("Post", x)}>
                  <Image style={styles.image} source={{ uri: x.image }} />
                </Pressable>
            </View>
        ))}
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  list: {
    padding: 8,
    paddingTop: 0,
    backgroundColor: "rgba(11, 11, 11, 1)",
    paddingBottom: 80,
  },
  postContainer: {
    borderColor: "rgba(65, 65, 65, 1)",
    backgroundColor: "rgba(20, 20, 20, 1)",
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: width,
  },
  owner: {
    color: COLORS.white,
  },
  info: {
    color: COLORS.gray,
    fontFamily: FONTS.light,
    fontSize: 12,   
  },
  postTop: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
})