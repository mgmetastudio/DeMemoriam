import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, RefreshControl } from "react-native"
import React, {useState, useEffect} from 'react'
import { BottomBar, Header, Post } from "../../components"
import { COLORS, FONTS } from "../../constants";
import { getApiConfig } from '../../functions/api';
import axios from "axios";

var height = Dimensions.get('window').height;

const Home = ({navigation}) => {

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    axios.get(`/feed/`, getApiConfig(false)).then((response) => {
      console.log('Home refreshed with: ', response['data'].count, ' posts.');
      setPosts(response['data'].results);
    }).catch((error) => {
      console.log('Error getting profile:', error)
    });
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Post navigation={navigation} posts={posts} />
      </ScrollView>
      <BottomBar navigation={navigation} portfolio={true} />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height,
    backgroundColor: "rgba(11, 11, 11, 1)",
  },
  text: {
    color: COLORS.white,
  },
})