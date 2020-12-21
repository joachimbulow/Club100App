import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    View,
    Linking,
    TouchableHighlight,
    RefreshControl,
    ActivityIndicator,
    Image
} from 'react-native'


function About(props) {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageView}>
                    <Image
                        source={require('../assets/beer.png')}
                        style={styles.headerImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        Club100 was developed by Joachim Bülow
                    </Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        https://github.com/joachimbulow/Club100App
                    </Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        joachimbulow@hotmail.dk
                    </Text>
                </View>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFCC00",
    },
    headerImage: {
        height: 150,
        width: 150,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    }




})

export default About