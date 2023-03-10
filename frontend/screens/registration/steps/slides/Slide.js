import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Pressable, TextComponent } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg';
import React, {useState} from 'react'
import { COLORS, FONTS } from "../../../../constants";
import FirstSlide from './FirstSlide';
import SecondSlide from './SecondSlide';
import ThirdSlide from './ThirdSlide';
import ForthSlide from './ForthSlide';

const slide1bubbles = <Svg width="68" height="12" viewBox="0 0 96 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#75E9BB"/>
<Circle cx="34" cy="6" r="6" fill="#414141"/>
<Circle cx="62" cy="6" r="6" fill="#414141"/>
<Circle cx="90" cy="6" r="6" fill="#414141"/>
</Svg>
const slide2bubbles = <Svg width="68" height="12" viewBox="0 0 96 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#414141"/>
<Circle cx="34" cy="6" r="6" fill="#75E9BB"/>
<Circle cx="62" cy="6" r="6" fill="#414141"/>
<Circle cx="90" cy="6" r="6" fill="#414141"/>
</Svg>
const slide3bubbles = <Svg width="68" height="12" viewBox="0 0 96 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#414141"/>
<Circle cx="34" cy="6" r="6" fill="#414141"/>
<Circle cx="62" cy="6" r="6" fill="#75E9BB"/>
<Circle cx="90" cy="6" r="6" fill="#414141"/>
</Svg>
const slide4bubbles = <Svg width="68" height="12" viewBox="0 0 96 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#414141"/>
<Circle cx="34" cy="6" r="6" fill="#414141"/>
<Circle cx="62" cy="6" r="6" fill="#414141"/>
<Circle cx="90" cy="6" r="6" fill="#75E9BB"/>
</Svg>


var width = Dimensions.get('window').width - 40;

const Slide = ({setStep, setShowLogin}) => {

  const [wslide, setWslide] = useState(0);

  const Connect = (x) => {
    if(x === 0) {
      setStep(2);
      setShowLogin(true);
    } else {
      setStep(3);
    }
  }
  const handleSlide = (e) => {
    var width = Dimensions.get('window').width;
    let position = e.nativeEvent.contentOffset.x
    if(position === 0) {
      console.log('Window Width 1: ', width, 'Position: ', position);
      setWslide(0);
    } else if(position <= width && position <= position * 2) {
      console.log('Window Width 2: ', width, 'Position: ', position);
      setWslide(1);
    } else if(position > width && position < width * 2) {
      console.log('Window Width 3: ', width, 'Position: ', position);
      setWslide(2);
    } else {
      console.log('Window Width 4: ', width, 'Position: ', position);
      setWslide(3);
      position = width * 4;
    }
  }

  return (
    <View style={styles.wrapper}>
       <ScrollView 
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={(e) => { handleSlide(e) }}>
        <FirstSlide />
        <SecondSlide />
        <ThirdSlide />
        <ForthSlide />
      </ScrollView>
      <View style={styles.bubblesWrapper}>
        {wslide === 0 ? slide1bubbles : wslide === 1 ? slide2bubbles : wslide === 2 ? slide3bubbles : slide4bubbles}
      </View>
      { wslide === 3 ? 
      <View style={styles.buttonsWrapper}>
        <Pressable style={styles.button1} onPress={() => Connect(0)}>
          <Text style={styles.text1}>Sign in</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={() => Connect(1)}>
          <Text style={styles.text2}>Sign up</Text>
        </Pressable>
      </View> 
      : 
      <View style={styles.buttonsWrapper}>
        <Pressable style={styles.buttonSkip} onPress={() => setWslide(3)}>
          <Text style={styles.textSkip}>Skip</Text>
        </Pressable>
      </View> 
        
      }
    </View>
  )
}

export default Slide

const styles = StyleSheet.create({
wrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    position: "relative",
    height: "100%"
},

bubblesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 130,
    width: "100%"
},
buttonsWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  width: width,
  gap: 10,
  position: "absolute",
  bottom: 30
},
button1: {
    borderWidth: 1,
    borderColor: COLORS.green,
    width: "50%",
    padding: 12,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 3,
},
text1: {
    color: COLORS.green,
    textAlign: 'center',
    fontFamily: FONTS.preety,
    fontSize: 16
},
button2: {
  borderWidth: 1,
  borderColor: COLORS.green,
  backgroundColor: COLORS.green,
  width: "50%",
  padding: 12,
  marginRight: 5,
  marginLeft: 5,
  borderRadius: 3,
},
text2: {
  color: "rgba(11, 11, 11, 1)",
  textAlign: 'center',
  fontFamily: FONTS.preety,
  fontSize: 16
},
textSkip: {
  color: COLORS.green,
  fontFamily: FONTS.medium,
  fontSize: 16
}
})