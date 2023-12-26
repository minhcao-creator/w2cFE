import * as React from 'react';
import { StyleSheet, View, Alert, Text, Button, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// require the module
// var RNFS = require('react-native-fs');
// var path = RNFS.DocumentDirectoryPath + '/test.txt';
const {width, height} = Dimensions.get('window');

export default function DetaiItem({ route, navigation }) {

    const { photo, item } = route.params
    // console.log(photo.base64)

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    const saveItem = async () => {
        // const token = await AsyncStorage.getItem('my-token');
        // if (token) {
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // } else {
        //     delete axios.defaults.headers.common['Authorization']
        // }
        // await axios.post('https://w2c.onrender.com/user/ingredients', { photo: `data:image/jpg;base64,${photo.base64}` })
        //     .then(res => console.log(res.data))
        //     .catch(error => console.log(error))

        navigation.navigate('Home')

        // let fileUri = FileSystem.documentDirectory + "text.txt";
        // console.log(fileUri)
        // await FileSystem.writeAsStringAsync(fileUri, photo, { encoding: FileSystem.EncodingType.UTF8 });

        // let result = null;
        // let content = await FileSystem.writeAsStringAsync(fileUri, photo.base64, { encoding: FileSystem.EncodingType.UTF8 }).then(function (data) {
        //     result = data;
        // }).catch(function (error) {
        //     console.log(error);
        // });
        // return result;
        // RNFS.writeFile(path, photo, 'utf8')
        //     .then((success) => {
        //         console.log('FILE WRITTEN!');
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
    }

    const getPhoto = () => {
        if(typeof item == undefined) {
            console.log(item)
            return "data:image/jpg;base64," + photo.base64
        } else {
            console.log(item)
            return item.image
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                style={{ marginHorizontal: 30 }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.preview} source={{ uri: getPhoto() }} />
                </View>
                <View style={{}}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: 'grey', marginTop: 20 }} />
                <View style={{ marginVertical: 20}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mô Tả</Text>
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 8}
                        style={{ fontSize: 16, color: '#9B9B9B', marginTop: 20 }}>{item.description}</Text>

                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={{ fontSize: 16, marginTop: 5, fontStyle: 'italic' }}>{textShown ? 'Rút Gọn' : 'Đọc Thêm'}</Text>
                            : null
                    }
                </View>  
            </ScrollView>
            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                    onPress={saveItem}
                    style={styles.btn}
                >
                    <Text style={{
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: 'bold',
                    }}>Lưu Lại</Text>
                </TouchableOpacity>
            </View>      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    preview: {
        resizeMode: 'cover',
        height: width - 180,
        width: width - 60,
        borderRadius: 30,
        marginVertical: 30,
    },
    btn: {
        height: 50,
        borderRadius: 16,
        backgroundColor: '#C67C4E',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 30
    },
});
