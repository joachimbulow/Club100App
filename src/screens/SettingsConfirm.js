import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ActivityIndicator,
    Image
} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import spotifyRequestHandler from '../utils/spotifyRequestHandler.js';
import LottieView from 'lottie-react-native';
import BeerFoam from '../components/beerFoamImageComponent.js'

function SettingsConfirm(props) {

    function navigateWithActivePlaybackCheck() {
        spotifyRequestHandler.getActivePlayback()
            .then((response) => {
                if (response.data.is_playing) {
                    spotifyRequestHandler.getUserProfile()
                        .then((response) => {
                            if (response.data.product == 'premium') {
                                props.navigation.navigate('Game',
                                    {
                                        playlistUri: props.route.params.playlistUri,
                                        difficulty: props.route.params.difficulty,
                                        minefield: props.route.params.minefield,
                                        shuffleMusic: props.route.params.shuffleMusic
                                    })
                            }
                            else {
                                alert("You need Spotify Premium to make use of this application")
                            }
                        })
                }
                else {
                    alert("You need an active playback for the app to take control. Switch to Spotify and start listening to a song, to begin.")
                }
            })
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <BeerFoam></BeerFoam>
                <View style={styles.imageView}>
                    <Image
                        source={require('../assets/beer.png')}
                        style={styles.headerImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Confirm game settings</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <View style={styles.borderedView}>
                        <View>
                            <Text style={styles.settingText}>Time per shot: {props.route.params.difficulty}</Text>
                        </View>
                        <View>
                            <Text style={styles.settingText}>Minefield: {props.route.params.minefield ? 'Yes' : 'No'}</Text>
                        </View>
                        <View>
                            <Text style={styles.settingText}>Shuffle music: {props.route.params.shuffleMusic ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => navigateWithActivePlaybackCheck()}>
                        <Text style={styles.buttonText}>
                            Start game
                        </Text>
                    </TouchableOpacity>
                </View>
                <LottieView
                    source={require('../assets/animations/background_animation.json')}
                    style={{ zIndex: -2 }}
                    autoPlay={true}
                    loop={true}
                />

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFCC00",
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    headerImage: {
        height: 150,
        width: 150,
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#EAFF00',
        borderWidth: 2,

    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17
    },
    buttonView: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    settingsContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.6,
    },
    borderedView: {
        borderWidth: 2,
        flex: 1,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 25
    }
})

export default SettingsConfirm