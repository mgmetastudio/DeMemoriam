import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Pressable, TextInput, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from "../../constants";
import HomeHeader from "../../components/HomeHeader"
import Hobbies from "./Hobbies"
import Photos from "./Photos"
import Collection from "./Collection"
import Edit from './Edit'
import Preview from './preview/Preview'
import Notification from './Notification'
import axios from "axios"
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width - 40;
var width2 = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var buttonHeight = Platform.OS === 'ios' ? height : height + 70;

const Upload = ({ navigation }) => {

  const [achievements, setAchievements] = useState('');
  const [otherHobbies, setOtherHobbies] = useState('');
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [genereatedId, setGeneratedId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [missing, setMissing] = useState('');
  const [owner, setOwner] = useState('');
  const [animatedImage, setAnimatedImage] = React.useState('');
  const [animatedVideo, setAnimatedVideo] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [generatedId, SetGeneratedId] = React.useState('');
  const [generatingTimer, setGeneratingTimer] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState();
  const [collection, setCollection] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [allow, setAllow] = useState(false);
  const [postId, setPostId] = useState();
  const [formImage, setFormImage] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [notificationText, setNotificationText] = useState('')

  const handleSelectItem = (itemId, item) => {
    if (selected.filter(selected => selected.includes(item)).length > 0) {
        const newArray = selected.filter(selected => selected !== item);
        setSelected(newArray);
    } else  {
      setSelected(current => [...current, item]);
    }
  }

  const handleSelectCollection = () => {
    setCollection(!collection);
    setAllow(!allow);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const setAction = () => {
    if(step === 1) {
      if(collection) {
        setError('');
        setStep(step + 1);
        setEnabled(false);
      } else {
        setError('Please select collection to continue')
      }
    }
    else if(step === 2) {
      if(!selected || !achievements) {
        setMissing('Please fill both fields hobbies and achievements')
      } else {
        setMissing('')
        setStep(step + 1);
      }
    }
    else if(step === 3) {
      if(!image) {
        setMissing('Please select image to upload first')
      } else {
        setMissing('')
        setStep(step + 1)
      }
    }
    else if(step === 4) {
      generateAnimation();
      setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    const owner = await SecureStore.getItemAsync('username');
    setToken(token);
    setOwner(owner);
  }

  const generateAnimation = () => {
    const optionsGenerate = {
      method: 'POST',
      url: 'https://api.d-id.com/talks',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic '
      },
      data: {
        script: {
          type: 'text',
          provider: {type: 'microsoft', voice_id: gender === 'male' ? 'Eric' : "Jenny" },
          ssml: 'false',
          input: result
        },
        config: {fluent: 'false', pad_audio: '0.0'},
        source_url: uploadedImage
      }
    };
    axios
    .request(optionsGenerate)
    .then(function (response) {
      SetGeneratedId(response.data.id);
      console.log("Getting new generated video ID:", response.data.id);
      console.log(response.data);
      displayVideo(response.data.id);
      setNotificationText('Currently we are generating your avatar video. Will let you know whens its done.')
      setGeneratingTimer(true);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  const displayVideo = (id) => {
    setTimeout(() => {
    console.log("Passing new generated video ID:", id);
    console.log(`New url looks like this https://api.d-id.com/talks/${id}`)
    const options = {
      method: 'GET',
      url: `https://api.d-id.com/talks/${id}`,
      headers: {
        accept: 'application/json',
        authorization: 'Basic '
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log("This main data:", response.data);
        setAnimatedImage(response.data.source_url);
        setAnimatedVideo(response.data.result_url);
        console.log("Video:", animatedVideo, "Image", animatedImage);
        setGeneratingTimer(false);
      })
      .catch(function (error) {
        console.error(error);
      });
    }, 30000);
  }

  useEffect(() => {
    getToken();
  }, []);

  // Refresh continue button status on options selected.

  useEffect(() => {
    if(step === 1) {
      if(collection) {
        setEnabled(true);
        setError('');
      } else {
        setEnabled(false);
      }
    } else if(step === 2) {
      if(selected.length !== 0 && achievements) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } else if(step === 3) {
      if(setUploadedImage != '') {
        setEnabled(true);
        setMissing('');
      } else {
        setEnabled(false);
      }

    }
  }, [collection, selected, achievements, setUploadedImage]);


  console.log('Button status active: ', enabled)

  const saveImage = async () => {
      fetch(
        `https://api.dememoriam.ai/posts/${id}/`,
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: formImage,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error('Error with image:', error);
        });
  };
  const saveToBackend = () => {
    console.log('Minting video');
    setGeneratingTimer(true);
    setNotificationText('Currently we are minting your avatar. Will let you know when it`s done.');
    uploadVideoToServer();
  }

  const uploadVideoToServer = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
      console.log('Video upload Started...');
      const form = new FormData();
      form.append('video', {
        uri: animatedVideo,
        type: 'video/mp4',
        name: `${postId}-animated-nft.mp4`,
      });
      console.log("Video url from form: ", form);
      fetch(
        `https://api.dememoriam.ai/posts/${postId}/video/`,
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: form,
        }
      )
        .then(response => response.json())
        .then((result) => {
          console.log('Video successfuly uploaded:', result);
          setModalVisible(true);
          setGeneratingTimer(false);
        })
        .catch((error) => {
          console.error('Error with video:', error);
        });
  };
  
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      extraScrollHeight={Platform.OS === 'ios' ? 0 : 50}
      extraHeight={Platform.OS === 'ios' ? 0 : 50}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            <HomeHeader title={
              step === 1 ? "Collection selection" :
              step === 2 ? "What are your thoughts" :
              step === 3 ?  "Upload your looks" :
              step === 4 ? "Edit transcript & voice" :
              step === 5 ? "Preview" : null } step={step} setStep={setStep} navigation={navigation} />
            { generatingTimer ? <Notification notificationText={notificationText} /> : null }
                {step === 1 ? 
                  <Collection 
                    collection={collection}
                    setCollection={setCollection}
                    handleSelectCollection={handleSelectCollection}
                    error={error}
                  /> :  
                step === 2 ? 
                <Hobbies 
                    handleSelectItem={handleSelectItem}
                    achievements={achievements}
                    otherHobbies={otherHobbies}
                    setAchievements={setAchievements}
                    setOtherHobbies={setOtherHobbies}
                    selected={selected}
                    missing={missing}
                    setName={setName}
                    setGender={setGender}
                    setUsername={setUsername}
                    isKeyboardVisible={isKeyboardVisible}
                    setKeyboardVisible={setKeyboardVisible}
                    setPostId={setPostId}
                /> : 
                step === 3 ?
                <Photos
                    image={image}
                    setImage={setImage} 
                    missing={missing}
                    setUploadedImage={setUploadedImage}
                    setFormImage={setFormImage}
                    postId={postId}
                /> :
                step === 4 ?
                <Edit 
                    result={result} 
                    setResult={setResult} 
                    selected={selected} 
                    image={image} 
                    achievements={achievements} 
                    otherHobbies={otherHobbies} 
                    loading={loading}
                    setLoading={setLoading}
                    name={name}
                    username={username}
                    gender={gender}
                    setPostId={setPostId}
                    saveImage={saveImage}
                    postId={postId}
                  />
                :
                step === 5 ?
                <Preview 
                    selected={selected} 
                    image={image} 
                    result={result} 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                    genereatedId={genereatedId}
                    animatedImage={animatedImage}
                    animatedVideo={animatedVideo}
                    setAnimatedImage={setAnimatedImage}
                    setAnimatedVideo={setAnimatedVideo}
                    uploadedImage={uploadedImage}
                    loading={loading}
                />
                : null
            }
        { step !== 5 ?
            !isKeyboardVisible ? 
            <View style={styles.buttonWrapper}>
                <Pressable style={[styles.button, enabled ? styles.activeButton : null]} onPress={() => setAction()}>
                    <Text style={[styles.buttonText, enabled ? styles.activeButton : null]}>Continue</Text>
                </Pressable>
            </View> : null :
            <View style={styles.buttonWrapper2}>
                <Pressable style={styles.button2} onPress={() => saveToBackend()}>
                    <Text style={styles.buttonText}>Mint NFT {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
                </Pressable>
            </View>
        }
        </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  )
}

export default Upload

const styles = StyleSheet.create({
  container: {
    height: buttonHeight
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
    borderColor: COLORS.gray,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
    marginLeft: 16,
},
activeButton: {
  borderColor: COLORS.green,
  color: COLORS.green,
},
buttonText: {
    fontFamily: FONTS.preety,
    color: COLORS.gray,
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
    backgroundColor: "rgba(11, 11, 11, 1)",
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
    width: width2 -32,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
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