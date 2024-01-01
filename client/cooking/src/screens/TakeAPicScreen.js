import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Back from '../../assets/back.svg';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default function TakeAPicScreen({ navigation }) {
  const isFocused = useIsFocused()
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text style={styles.container}>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto)
    await cameraRef.current.pausePreview();
    // await cameraRef.current.takePictureAsync(null);
  };

  if (photo) {
    let savePhoto = async () => {
      setLoader(true);

      const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.post('https://w2c.onrender.com/user/ingredients', { photo: `data:image/jpg;base64,${photo.base64}` })
            .then(res => 
              navigation.navigate('DetailItem', {
                photo: photo,
                item: res.data.ingredient
              }))
            .catch(error => console.log(error))
      setPhoto(undefined)
      setLoader(false)
      // setHasCameraPermission(undefined)
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <ActivityIndicator style={{position: 'absolute', top: 0.3 * height, left: 0.5 * width - 50 }} size={100} animating={loader} />
        <View style={styles.container1}>

          <TouchableOpacity
            onPress={() => setPhoto(undefined)}
            style={[styles.button1, {opacity: loader ? 0.3 : 1}]}
          >
            <Text style={{
              fontSize: 16,
              color: '#ffffff',
            }}>Bỏ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={savePhoto}
            style={[styles.button1, {opacity: loader ? 0.3 : 1}]}
          >
            <Text style={{
              fontSize: 16,
              color: '#ffffff',
            }}>Lưu</Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );
  }

  return (
    ( isFocused && < Camera style={styles.container2} ref={cameraRef} >
      <TouchableOpacity
        onPress={takePic}
        style={styles.button}
      />
    </Camera >)

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  container2: {
    flex: 1,
    marginVertical: 110
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  button: {
    borderWidth: 6,
    borderColor: '#ffffff',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C67C4E',
    position: 'absolute',
    bottom: 10,
    marginLeft: 160
  },
  container1: {
    flexDirection: 'row',
    margin: 20
  },
  button1: {
    backgroundColor: '#C67C4E',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 40
  }
});