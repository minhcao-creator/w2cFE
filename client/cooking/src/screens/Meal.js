import * as React from 'react';
import { StyleSheet, View, Alert, Text, Button, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../../assets/back.svg';
import Trash from '../../assets/trash.svg'
import { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {width, height} = Dimensions.get('window');

export default function Meal({ route, navigation }) {

    const { item } = route.params
    console.log(item)

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const [ingredientMode, setIngredientMode] = useState(true);

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    const ingredientsView = () => {
        return (
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>Nguyên Liệu Bao Gồm</Text>
                
                {item.ingredients.map((ing) => (
                    <Text style={{ fontSize: 16 }}>{ ing.title }</Text>
                ))}
            </View>
        )
    }

    const recipeView = () => {
        const steps = item.recipe.split("   ");

        return (
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>Các Bước Thực Hiện</Text>
                
                {steps.map((step) => (
                    <Text style={{ fontSize: 16 }}>{ step }</Text>
                ))}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                style={{ flex: 1, marginTop: 30, marginHorizontal: 30}}
            >
                <View style={{ alignItems: 'center' }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', height: 50, width: 290, borderRadius: 15 }}>
                        <TouchableOpacity
                            onPress={() => setIngredientMode(true)}
                            style={ ingredientMode ? styles.activeBtn : styles.btn }
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: ingredientMode ? '#fff' : '#2F2D2C'
                            }}>Nguyên Liệu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIngredientMode(false)}
                            style={ ingredientMode ? styles.btn : styles.activeBtn }
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: ingredientMode ? '#2F2D2C' : '#fff'
                            }}>Công Thức</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.preview} source={{ uri: item.image }} />
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: 'capitalize' }}>{item.title}</Text>
                </View>

                <View style={{ height: 0.5, backgroundColor: 'grey', marginTop: 20 }} />

                <View style={{ marginTop: 20 }}>
                    { ingredientMode ? (
                        ingredientsView()
                    ) : (
                        recipeView()
                    )}
                </View>  
            </ScrollView>
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
    activeBtn: {
        borderRadius: 10,
        height: 40, 
        width: 140, 
        backgroundColor: '#C67C4E', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        borderRadius: 10,
        height: 40,
        width: 140,
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
    }
});
