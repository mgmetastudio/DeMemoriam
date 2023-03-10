import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern } from 'react-native-svg';
import { COLORS, FONTS } from "../constants";


const approved = <Svg style={{position: "absolute", top: -6, right: -7, zIndex: 2}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.28999 0.715874C9.68117 0.321464 10.3188 0.321464 10.71 0.715875L12.085 2.10218C12.3124 2.33152 12.6366 2.43686 12.9555 2.38502L14.8827 2.07165C15.431 1.9825 15.9468 2.3573 16.0315 2.90632L16.329 4.83603C16.3782 5.15527 16.5786 5.43107 16.867 5.57653L18.6103 6.45579C19.1063 6.70594 19.3034 7.31239 19.0491 7.80631L18.1556 9.54235C18.0077 9.82954 18.0077 10.1705 18.1556 10.4577L19.0491 12.1937C19.3034 12.6876 19.1063 13.2941 18.6103 13.5442L16.867 14.4235C16.5786 14.5689 16.3782 14.8447 16.329 15.164L16.0315 17.0937C15.9468 17.6427 15.431 18.0175 14.8827 17.9283L12.9555 17.615C12.6366 17.5631 12.3124 17.6685 12.085 17.8978L10.71 19.2841C10.3188 19.6785 9.68117 19.6785 9.28999 19.2841L7.91505 17.8978C7.68759 17.6685 7.36336 17.5631 7.04454 17.615L5.11734 17.9283C4.56904 18.0175 4.05316 17.6427 3.96852 17.0937L3.67101 15.164C3.6218 14.8447 3.42141 14.5689 3.13301 14.4235L1.38968 13.5442C0.893689 13.2941 0.696642 12.6876 0.950867 12.1937L1.84444 10.4577C1.99226 10.1705 1.99226 9.82954 1.84444 9.54235L0.950867 7.80631C0.696642 7.31239 0.89369 6.70594 1.38968 6.45579L3.13301 5.57653C3.42141 5.43107 3.6218 5.15527 3.67101 4.83603L3.96852 2.90632C4.05316 2.3573 4.56904 1.9825 5.11734 2.07165L7.04454 2.38502C7.36336 2.43686 7.68759 2.33152 7.91505 2.10218L9.28999 0.715874Z" fill="#75E9BB"/>
<Path d="M6.25098 9.1L8.75098 11.5L12.9176 7.5" stroke="#0B0B0B" stroke-width="1.2" stroke-linecap="round"/>
</Svg>
const logo = <Svg style={{ marginRight: 10 }} width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M17.6825 8.76371C17.9633 8.41281 18.2425 8.05983 18.5215 7.70688C18.8168 7.33335 18.8122 6.74446 18.5116 6.37713C15.6928 2.93312 12.6185 0.00115543 8.73387 0.00115543C3.62405 0.00115543 0 4.44511 0 10.1081C0 15.5557 3.68399 20 8.31786 20C13.1899 20 16.4578 16.0577 21.2704 9.89306C23.0531 7.81417 26.5584 3.22662 30.1822 3.22662C33.2718 3.22662 35.8268 5.66383 35.6483 10.2514C35.5297 13.7636 33.3311 16.7742 30.0037 16.7742C27.1111 16.3932 25.196 14.5524 22.4042 11.251C22.0879 10.8775 21.5794 10.8888 21.2751 11.2769C20.9718 11.6642 20.6673 12.0502 20.3615 12.4345C20.0558 12.8188 20.0693 13.4309 20.3925 13.7943C24.1349 18.0054 26.8939 19.9996 30.0039 19.9996C34.8164 19.9996 38.8571 16.129 38.8571 10.036C38.8571 4.37312 35.4705 0 30.5986 0C25.8454 0 22.7561 3.72761 19.1615 8.27909C15.5665 12.8306 12.3583 16.774 8.91224 16.774C5.70373 16.774 3.26762 13.9069 3.20838 10.1794C3.14879 6.52361 5.16924 3.22608 8.43706 3.22608C11.7145 3.22608 14.3076 5.96267 16.5423 8.76263C16.8538 9.15225 17.3711 9.15225 17.6825 8.76293L17.6825 8.76371Z" fill="#75E9BB"/>
</Svg>


const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
          { logo }
          <Text style={styles.title}>DeMemoriam</Text>
        </View>
      </View>
      <View style={styles.right}>
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