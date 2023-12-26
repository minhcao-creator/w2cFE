import React, { Component, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    Pressable,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import { categoryData } from '../constants';
import { useIsFocused, NavigationContainer } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Favourite = ({ route, navigation }) => {
    const [favouriteMeals, setFavouriteMeals] = useState([])
    const isFocused = useIsFocused()

    const favourite = async () => {
        const token = await AsyncStorage.getItem('my-token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        await axios.get('https://w2c.onrender.com/user/meals')
            .then(res => {
                console.log(res.data)
                setFavouriteMeals(res.data.meals)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        favourite()
        // console.log(favouriteMeals)
    }, [isFocused])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginTop: 20 }}>
                    <Favourites favourites={favouriteMeals} />
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

function Favourites({ favourites }) {
    return (
        <View style={{ marginHorizontal: 30 }}>
            {  
                favourites?.length == 0 ? null : (
                    <MasonryList
                        data={favourites}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => <FavouriteCard item={item} index={i} />}
                        onEndReachedThreshold={0.1}
                    />
                )
            }
        </View>
    );
};

function FavouriteCard({ item, index }) {
    let isEven = index % 2 === 0;

    return (
        <View>
            <Pressable style={[styles.card, { margingLeft: isEven ? 0 : 8.5 }, { marginRight: isEven ? 8.5 : 0 }]}>
                <Image source={{ uri: item.meal.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>
                    {
                        item.meal.title.length > 15 ? item.meal.title.slice(0, 15) + '...' : item.meal.title
                    }
                </Text>
                <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }}>
                    <Ionicons name={"close-circle-outline"} size={28} color='#000' />
                </TouchableOpacity>
                <View style={styles.star}>
                    <AntDesign name="star" size={20} color="#FBBE21" />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingTop: 10,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
        marginBottom: 24,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
    itemImage: {
        width: 142,
        height: 132,
        borderRadius: 20,
    },
    itemName: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        flexWrap: 'wrap',
        paddingTop: 19,
        paddingBottom: 40,
    },
    star: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000029',
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 25,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    }
});

