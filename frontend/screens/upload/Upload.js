import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from "../../constants";
import HomeHeader from "../../components/HomeHeader"
import Hobbies from "./Hobbies"
import Photos from "./Photos"
import Edit from './Edit'
import Preview from './preview/Preview'
import axios from "axios"
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width - 40;

const Upload = ({ navigation }) => {

  const [achievements, setAchievements] = useState('');
  const [otherHobbies, setOtherHobbies] = useState('');
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [genereatedId, setGeneratedId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [token, setToken] = useState('');

  const hobbies = ['writing', 'painting', 'sports', 'cooking', 'dance', 'learning', 'shopping', 'gardening', 'drawing', 'other..'];
  const [selected, setSelected] = useState([]);

  const handleSelectItem = (itemId, item) => {
    if (selected.filter(selected => selected.includes(item)).length > 0) {
        const newArray = selected.filter(selected => selected !== item);
        setSelected(newArray);
    } else  {
      setSelected(current => [...current, item]);
    }
    console.log("Hobbies:", selected)
  }

  const setAction = () => {
    if(step === 3) {
      generateDID();
      setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  const optionsGenerate = {
    method: 'POST',
    url: 'https://api.d-id.com/talks',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJpc3MiOiJodHRwczovL2F1dGguZC1pZC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDAxMjYxNjQ1ODk1NzcyNTQ2OTEiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Nzc0OTA0OTgsImV4cCI6MTY3NzU3Njg5OCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.XKUfMuHruSJS2Uy665uDTf1ZZqPgIj6pjOuUJc-DLHgxgxfwnq9X9ZBfmbhiBoeau1udedyTKMSa6k0GmOWypAxlgco-gauLV57B4HiMxDsOy03b3KTJfUQlVCy5Fyk75xKsmMwt25JXQSuxB-a2E1sm1ag-tfp9bOYryBJxl2RMGZXLcV98tx3uD0VANAPCSL0b59nBT4Wt1iUbn1epvk7AfSnLtXAnRbh0JBVpnM51Z8vXqffSmu8v5YYhmyOfHr3ssW803q24P5Ff8ghdj16OhbIyRdDVMdop83a2hYNOjhrWUsbddCrCoA7bSiAQhB4mmzHnrSqCWhZjhgQWyg9'
    },
    data: {
      script: {
        type: 'text',
        provider: {type: 'microsoft', voice_id: 'Jenny'},
        ssml: 'false',
        input: 'I\'m testing this API!'
      },
      config: {fluent: 'false', pad_audio: '0.0'},
      source_url: 'https://i.pinimg.com/originals/d6/a9/57/d6a957f1d8045c9c973c12bf5968326f.jpg'
    }
  };

  const optionsShow = {
    method: 'GET',
    url: `https://api.d-id.com/talks/tlk_iEJM8at0UneNwtwgePhVk`,
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJpc3MiOiJodHRwczovL2F1dGguZC1pZC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDAxMjYxNjQ1ODk1NzcyNTQ2OTEiLCJhdWQiOlsiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kLWlkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Nzc0OTA0OTgsImV4cCI6MTY3NzU3Njg5OCwiYXpwIjoiR3pyTkkxT3JlOUZNM0VlRFJmM20zejNUU3cwSmxSWXEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MifQ.XKUfMuHruSJS2Uy665uDTf1ZZqPgIj6pjOuUJc-DLHgxgxfwnq9X9ZBfmbhiBoeau1udedyTKMSa6k0GmOWypAxlgco-gauLV57B4HiMxDsOy03b3KTJfUQlVCy5Fyk75xKsmMwt25JXQSuxB-a2E1sm1ag-tfp9bOYryBJxl2RMGZXLcV98tx3uD0VANAPCSL0b59nBT4Wt1iUbn1epvk7AfSnLtXAnRbh0JBVpnM51Z8vXqffSmu8v5YYhmyOfHr3ssW803q24P5Ff8ghdj16OhbIyRdDVMdop83a2hYNOjhrWUsbddCrCoA7bSiAQhB4mmzHnrSqCWhZjhgQWyg9'
    }
  };

  const showDID = async () => {
  axios
    .request(optionsShow)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const generateDID = async () => {
    axios
      .request(optionsGenerate)
      .then(function (response) {
        console.log(response.data);
        setGeneratedId(response.data.id)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const aboutMe = {
      id: `NFT-${getRandomInt(100000)}`,
      owner: "Rysard",
      creator: "Rysard Gvozdovic",
      status: "Public",
      date: "12h",
      contract: "15rfe32f233f2cse...",
      blockchain: "Flow",
      standard: "ERC-721",
      collection: "Life Story collection",
      description: result,
      image: image,
  }
  const saveToBackend = () => {
    setLoading(true);
        var edit = {
            about_me: JSON.stringify(aboutMe),
          } 
        console.log('Edit: ', edit)
        fetch('https://api.dememoriam.ai/user/profile/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify(edit)
        })
        .then(response => response.json())
        .then(data => {
          setModalVisible(true);
          setLoading(false);
          console.log("Profile data: ", data);
        })
  }
  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    setToken(token);
  }
  useEffect(() => {
    getToken();
  }, []);

  console.log("Wop:", token);

  return (
        <SafeAreaView style={styles.container}>
            <HomeHeader title={step === 1 ? "What are your thoughts" : "Upload your looks"} step={step} setStep={setStep} navigation={navigation} />
            { step === 1 ? 
                <Hobbies 
                    handleSelectItem={handleSelectItem}
                    achievements={achievements}
                    otherHobbies={otherHobbies}
                    setAchievements={setAchievements}
                    setOtherHobbies={setOtherHobbies}
                    hobbies={hobbies}
                    selected={selected}
                /> : 
                step === 2 ?
                <Photos
                    image={image}
                    setImage={setImage} 
                /> :
                step === 3 ?
                <Edit 
                    result={result} 
                    setResult={setResult} 
                    selected={selected} 
                    image={image} 
                    achievements={achievements} 
                    otherHobbies={otherHobbies} 
                    loading={loading}
                    setLoading={setLoading}
                  />
                :
                step === 4 ?
                <Preview 
                    selected={selected} 
                    image={image} 
                    result={result} 
                    showDID={showDID}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                />
                : null
            }
        { step !== 4 ?
            <View style={styles.buttonWrapper}>
                <Pressable style={styles.button} onPress={() => setAction()}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View> :
            <View style={styles.buttonWrapper2}>
                <Pressable style={styles.button2} onPress={() => saveToBackend()}>
                    <Text style={styles.buttonText}>Mint NFT {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
                </Pressable>
                <Pressable style={styles.button3} onPress={() => Alert.alert('Popup saved to gallery')}>
                    <Text style={styles.buttonText2}>Save video</Text>
                    <Text style={styles.buttonTextSecondary}>Without minting</Text>
                </Pressable>
            </View>
        }
        </SafeAreaView>
  )
}

export default Upload

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
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
  paragraph: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 7
  },
  continue: {
    position: 'absolute',
    bottom: 45,
    marginLeft: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: 10,
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  continueText: {
    color: COLORS.green,
    fontFamily: FONTS.preety,
    textAlign: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
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
buttonText2: {
    fontFamily: FONTS.preety,
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 16
},
buttonWrapper: {
    position: 'absolute',
    bottom: 45,
},
buttonWrapper2: {
    position: 'absolute',
    paddingTop: 20,
    bottom: 45,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(65, 65, 65, 1)"
    
},
button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width / 2,
    marginLeft: 16,
},
button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.white,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width / 2,
    marginLeft: 16,
},
buttonTextSecondary: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 12
},
  input: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    padding: 10,
    borderRadius: 2,
    marginBottom: 30,
  },
  
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 12,
  },
  listItem: {
    color: COLORS.gray,
    borderWidth: 1,
    fontSize: 15,
    borderColor: COLORS.gray,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 15,
    flexGrow: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  listItemActive: {
    color: COLORS.green,
    borderWidth: 1,
    fontSize: 15,
    borderColor: COLORS.green,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 15,
    flexGrow: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  listText: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    textAlign: "center",
    textTransform: "capitalize",
  },
})