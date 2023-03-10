import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg';
import React from 'react'
import { COLORS, FONTS } from "../../../../constants";

var width = Dimensions.get('window').width - 32;

const SecondSlide = () => {
  return (
    <View style={styles.container}>
        <View>
          <Text style={{ fontFamily: FONTS.regular, color: "rgba(238, 238, 238, 1)", textAlign: "center", fontSize: 16 }}>Stored on Blockchain</Text>
        </View>
        <View style={styles.logo}>
            <Text style={{ fontFamily: FONTS.preety, color: "rgba(238, 238, 238, 1)", textAlign: "center", fontSize: 32, lineHeight: 42 }}>Storing your memories for ages</Text>
        </View>
        <View>
          <Text style={{ fontFamily: FONTS.regular, color: "rgba(238, 238, 238, 1)", textAlign: "center", fontSize: 14 }}>Individuals can explore other user's experiences, discover fascinating details about another person's life, or simply enjoy themselves while discovering something novel and inventive.</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
                style={{
                width: 396,
                height: 312,
                }}
                source={require('../../../../assets/Images/slide2.png')} 
          /> 
        </View>
    </View>
  )
}

export default SecondSlide

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingLeft: 16,
        paddingRight: 16,
      },
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
},
logo: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
},
title: {
    fontSize: 40,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    lineHeight: 62,
    marginTop: 20
},
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    position: 'absolute',
    bottom: 45,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
    marginLeft: 16,
},
buttonText: {
    fontFamily: FONTS.preety,
    color: COLORS.green,
    fontSize: 16
},
listItem: {
    color: COLORS.white,
    borderColor: COLORS.green,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    margin: 5,
},
list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -5,
    marginRight: -5,
},
imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 40
},
bubblesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
})