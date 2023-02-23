import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern } from 'react-native-svg';
import { COLORS, FONTS } from "../constants";


const approved = <Svg style={{position: "absolute", top: -6, right: -7, zIndex: 2}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.28999 0.715874C9.68117 0.321464 10.3188 0.321464 10.71 0.715875L12.085 2.10218C12.3124 2.33152 12.6366 2.43686 12.9555 2.38502L14.8827 2.07165C15.431 1.9825 15.9468 2.3573 16.0315 2.90632L16.329 4.83603C16.3782 5.15527 16.5786 5.43107 16.867 5.57653L18.6103 6.45579C19.1063 6.70594 19.3034 7.31239 19.0491 7.80631L18.1556 9.54235C18.0077 9.82954 18.0077 10.1705 18.1556 10.4577L19.0491 12.1937C19.3034 12.6876 19.1063 13.2941 18.6103 13.5442L16.867 14.4235C16.5786 14.5689 16.3782 14.8447 16.329 15.164L16.0315 17.0937C15.9468 17.6427 15.431 18.0175 14.8827 17.9283L12.9555 17.615C12.6366 17.5631 12.3124 17.6685 12.085 17.8978L10.71 19.2841C10.3188 19.6785 9.68117 19.6785 9.28999 19.2841L7.91505 17.8978C7.68759 17.6685 7.36336 17.5631 7.04454 17.615L5.11734 17.9283C4.56904 18.0175 4.05316 17.6427 3.96852 17.0937L3.67101 15.164C3.6218 14.8447 3.42141 14.5689 3.13301 14.4235L1.38968 13.5442C0.893689 13.2941 0.696642 12.6876 0.950867 12.1937L1.84444 10.4577C1.99226 10.1705 1.99226 9.82954 1.84444 9.54235L0.950867 7.80631C0.696642 7.31239 0.89369 6.70594 1.38968 6.45579L3.13301 5.57653C3.42141 5.43107 3.6218 5.15527 3.67101 4.83603L3.96852 2.90632C4.05316 2.3573 4.56904 1.9825 5.11734 2.07165L7.04454 2.38502C7.36336 2.43686 7.68759 2.33152 7.91505 2.10218L9.28999 0.715874Z" fill="#75E9BB"/>
<Path d="M6.25098 9.1L8.75098 11.5L12.9176 7.5" stroke="#0B0B0B" stroke-width="1.2" stroke-linecap="round"/>
</Svg>


const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
          <Text style={styles.title}>DeMemoriam</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Pressable style={styles.icon} onPress={() => Alert.alert('Search coming sooner or later')}>
        <Svg style={{marginRight: 10}} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="40" height="40" rx="20" fill="#373737"/>
          <Path d="M18.432 25.425C19.9981 25.4266 21.519 24.8998 22.7487 23.9303L27.39 28.5716L28.5768 27.3848L23.9355 22.7435C25.2471 21.0695 25.7267 18.8902 25.2383 16.8205C24.7502 14.7507 23.3474 13.0152 21.426 12.1039C19.5045 11.1926 17.2731 11.2043 15.3615 12.1359C13.4498 13.0675 12.0654 14.8176 11.5991 16.8923C11.1328 18.9672 11.6352 21.1415 12.9643 22.8014C14.2935 24.4613 16.3055 25.4267 18.432 25.4251L18.432 25.425ZM18.432 13.1081C19.8427 13.1081 21.1956 13.6685 22.193 14.6659C23.1904 15.6633 23.7508 17.0161 23.7508 18.4267C23.7508 19.8372 23.1904 21.1902 22.193 22.1876C21.1956 23.185 19.8426 23.7455 18.432 23.7455C17.0215 23.7455 15.6687 23.185 14.6713 22.1876C13.6739 21.1902 13.1135 19.8372 13.1135 18.4267C13.1135 17.0161 13.6739 15.6633 14.6713 14.6659C15.6687 13.6685 17.0215 13.1081 18.432 13.1081Z" fill="#54595D"/>
        </Svg>
        </Pressable>
        <Pressable style={styles.icon} onPress={() => Alert.alert('This is going to be everything about profile')}>
        {approved}
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="40" height="40" rx="20" fill="#373737"/>
          <Path d="M20.1669 19.7049C22.8937 19.7049 25.0985 17.5003 25.0985 14.7733C25.0985 12.0465 22.8938 9.8418 20.1669 9.8418C17.4401 9.8418 15.2354 12.0464 15.2354 14.7733C15.2354 17.5001 17.4402 19.7049 20.1669 19.7049Z" fill="#54595D"/>
          <Path d="M23.6775 20.2856H16.6573C14.2785 20.2856 12.335 22.2294 12.335 24.608V29.5686C12.335 29.8877 12.596 30.1488 12.9152 30.1488H27.4198C27.7389 30.1488 28 29.8877 28 29.5686L27.9998 24.608C27.9998 22.2293 26.0563 20.2856 23.6775 20.2856Z" fill="#54595D"/>
        </Svg>
        </Pressable>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(65, 65, 65, 1)",
    padding: 15,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
},
})