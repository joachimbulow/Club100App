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


function HowToPlay(props) {
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
                <View style={styles.textContainer}>
                    <View style={styles.stepTextView}>
                        <Text style={styles.stepText}>
                            1. Press play and authorize with Spotify.
                            Make sure you are listening to music, so the app can take control.
                    </Text>
                    </View>
                    <View style={styles.stepTextView}>
                        <Text style={styles.stepText}>
                            2. Choose your music and settings by navigating through the wizard.
                            If you enable minefield, there's a small chance each round that a bomb goes off. If you hear the explosion, you must drink a liquor shot or triple the beer shots this round. 
                    </Text>
                    </View>
                    <View style={styles.stepTextView}>
                        <Text style={styles.stepText}>
                            3. The game will start. Every time a minute passes, the music will change and you have to do a shot of beer!
                    </Text>
                    </View>
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
        marginBottom: 0
    },
    stepTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    },
    stepText: {
        textAlign: "center",
        fontSize: 17,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }



})

export default HowToPlay