import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView } from "react-native"
import { BottomBar, Header, Post } from "../../components"
import { COLORS, FONTS } from "../../constants";
import Openai from "../../functions/openai"

var height = Dimensions.get('window').height;

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <Post navigation={navigation} />
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