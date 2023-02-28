import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { COLORS, FONTS } from '../../constants';
import {BottomBar} from '../../components';
import { getApiConfig } from '../../functions/api';
import axios from "axios";
import NoPosts from './NoPosts';
import PostsFeed from './PostsFeed';

const add = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M16.1793 9.78746C16.0176 9.78751 15.8626 9.85171 15.7483 9.96606C15.634 10.0804 15.5698 10.2354 15.5698 10.3971L15.5698 15.3908L10.576 15.3908C10.3585 15.3911 10.1575 15.5073 10.0487 15.6958C9.94005 15.8842 9.94005 16.1164 10.0487 16.3049C10.1575 16.4934 10.3585 16.6096 10.576 16.6099L15.5698 16.6099L15.5698 21.6036C15.5701 21.8212 15.6863 22.0222 15.8748 22.1309C16.0632 22.2396 16.2954 22.2396 16.4839 22.1309C16.6724 22.0222 16.7886 21.8212 16.7889 21.6036L16.7889 16.6099L21.7826 16.6099C22.0002 16.6096 22.2012 16.4934 22.3099 16.3049C22.4186 16.1164 22.4186 15.8842 22.3099 15.6958C22.2012 15.5073 22.0002 15.3911 21.7826 15.3908H16.7889L16.7889 10.3971C16.7889 10.2354 16.7247 10.0804 16.6104 9.96606C16.496 9.85171 16.341 9.78747 16.1793 9.78746L16.1793 9.78746Z" fill="#75E9BB"/>
<Rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#75E9BB"/>
</Svg>;
const burger = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect x="5" y="7" width="22" height="2" rx="1" fill="#9B9B9B"/>
<Rect x="5" y="15" width="22" height="2" rx="1" fill="#9B9B9B"/>
<Rect x="5" y="23" width="22" height="2" rx="1" fill="#9B9B9B"/>
</Svg>;
const approved = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M11.29 0.715874C11.6812 0.321464 12.3188 0.321464 12.71 0.715875L14.5744 2.5957C14.8019 2.82504 15.1261 2.93039 15.4449 2.87855L18.0582 2.45362C18.6065 2.36446 19.1224 2.73927 19.2071 3.28828L19.6105 5.90498C19.6597 6.22422 19.8601 6.50002 20.1485 6.64548L22.5124 7.83775C23.0084 8.08791 23.2055 8.69436 22.9512 9.18827L21.7396 11.5423C21.5917 11.8295 21.5917 12.1705 21.7396 12.4577L22.9512 14.8117C23.2055 15.3056 23.0084 15.9121 22.5124 16.1622L20.1485 17.3545C19.8601 17.5 19.6597 17.7758 19.6105 18.095L19.2071 20.7117C19.1224 21.2607 18.6065 21.6355 18.0582 21.5464L15.4449 21.1215C15.1261 21.0696 14.8019 21.175 14.5744 21.4043L12.71 23.2841C12.3188 23.6785 11.6812 23.6785 11.29 23.2841L9.42556 21.4043C9.1981 21.175 8.87388 21.0696 8.55506 21.1215L5.94177 21.5464C5.39347 21.6355 4.87759 21.2607 4.79295 20.7117L4.38953 18.095C4.34031 17.7758 4.13993 17.5 3.85153 17.3545L1.48756 16.1622C0.991576 15.9121 0.794529 15.3056 1.04875 14.8117L2.26044 12.4577C2.40826 12.1705 2.40826 11.8295 2.26044 11.5423L1.04875 9.18827C0.794529 8.69436 0.991577 8.08791 1.48756 7.83775L3.85153 6.64548C4.13993 6.50002 4.34031 6.22422 4.38953 5.90498L4.79295 3.28828C4.87759 2.73927 5.39347 2.36446 5.94177 2.45362L8.55506 2.87855C8.87388 2.93039 9.1981 2.82504 9.42556 2.5957L11.29 0.715874Z" fill="#75E9BB"/>
<Path d="M7.50122 10.9199L10.5012 13.7999L15.5012 8.99994" stroke="#0B0B0B" stroke-width="1.5" stroke-linecap="round"/>
</Svg>;

const User = ({ navigation, route }) => {

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [avatar, setAvatar] = useState(require('../../assets/Images/default-user.jpg'));
  const [description, setDescription] = useState('This is my profile on DeMemoriam social platform');
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get(`user/profile/${route.params ? route.params : ''}`, getApiConfig()).then((response) => {
      if(response['data'].about_me) {
        setPosts(JSON.parse(response['data'].about_me));
      }
      setUser(response['data'].username);
      setName(response['data'].first_name);
      setSurname(response['data'].last_name);
      if(response['data'].avatar !== null) {
        setAvatar(response['data'].avatar);
      }
    }).catch((error) => {
      console.log('error getting profile', error)
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userHeader}>
        <Text style={styles.userName}> {name ? `${name} ${surname}`: user} { approved }</Text>
        <View style={styles.userHeaderRight}>
          <View>{ add }</View>
          <View>{ burger }</View>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.userInfoLeft}>
          <Image style={styles.image} source={avatar} />
        </View>
        <View style={styles.userInfoRight}>
          <View style={styles.userInfoFlex}>
            <Text style={styles.text}>{posts ? '1' : 0}</Text>
            <Text style={styles.text}>NFTs</Text>
          </View>
          <View style={styles.userInfoFlex}>
            <Text style={styles.text}>0</Text>
            <Text style={styles.text}>Following</Text>
          </View>
          <View style={styles.userInfoFlex}>
            <Text style={styles.text}>0</Text>
            <Text style={styles.text}>Tops</Text>
          </View>
        </View>
      </View>
      <View style={styles.userInfoBottom}>
        <Text style={styles.userNameGreen}>{ user }</Text>
        <Text style={styles.userDescription}>{ description }</Text>
      </View>
      <View style={styles.body}>
        { posts ? <PostsFeed posts={posts} /> : <NoPosts navigation={navigation} /> }
      </View>
      <BottomBar navigation={navigation} />
    </SafeAreaView>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(11, 11, 11, 0.8)",

  },
  userName: {
    color: COLORS.white,
    fontFamily: FONTS.preety,
    fontSize: 20,
  },
  userNameGreen: {
    color: COLORS.green,
    fontFamily: FONTS.regular,
    fontSize: 14,
    paddingBottom: 3,
  },
  userDescription: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "rgba(65, 65, 65, 1)",
    borderBottomWidth: 1,
  },
  userHeaderRight: {
    display: "flex",
    flexDirection: "row",
    gap: 15
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  userInfoRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  userInfoLeft: {
    width: "20%",
  },
  userInfoFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoBottom: {
    padding: 16,
    paddingTop: 0,
    borderBottomColor: "rgba(65, 65, 65, 1)",
    borderBottomWidth: 1,
  },
})