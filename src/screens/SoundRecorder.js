import React, { useState, useRef } from 'react';
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
import { TouchableOpacity } from "react-native-gesture-handler";
import RecordAndPlayButton from '../components/RecordAndPlayButton.js'
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import spotifyRequestHandler from '../utils/spotifyRequestHandler.js';

function SoundRecorder(props) {
    //Check whether or not user has an active session started before letting them continue

    const [recordings, setRecordings] = useState([])
    const players = useRef([
        new Player("../../assets/soundfiles/soundfile1.mp4", { autoDestroy: false }),
        new Player("../../assets/soundfiles/soundfile2.mp4", { autoDestroy: false }),
        new Player("../../assets/soundfiles/soundfile3.mp4", { autoDestroy: false }),
        new Player("../../assets/soundfiles/soundfile4.mp4", { autoDestroy: false }),
        new Player("../../assets/soundfiles/soundfile5.mp4", { autoDestroy: false })
    ])

    const recorders = useRef([
        new Recorder("../../assets/soundfiles/soundfile1.mp4"),
        new Recorder("../../assets/soundfiles/soundfile2.mp4"),
        new Recorder("../../assets/soundfiles/soundfile3.mp4"),
        new Recorder("../../assets/soundfiles/soundfile4.mp4"),
        new Recorder("../../assets/soundfiles/soundfile5.mp4")
    ])

    function startPlayer(instance) {
        players.current[instance - 1].play();
    }

    function startRecording(instance) {
        recorders.current[instance - 1].record();
    }

    function navigateWithActivePlaybackCheck() {
        spotifyRequestHandler.getActivePlayback()
            .then((response) => {
                if (response.data.is_playing) {
                    props.navigation.navigate('Game',
                        {
                            playlistUri: props.route.params.playlistUri,
                            difficulty: props.route.params.difficulty,
                            minefield: props.route.params.minefield,
                            shuffleMusic: props.route.params.shuffleMusic
                        })
                }
                else {
                    alert("You need an active playback for the app to take control. Switch to Spotify and start listening to a song to begin.")
                }
            })
    }

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
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Record your drinking sounds (Coming soon)</Text>
                </View>

                <View style={styles.recordingsView}>
                    <RecordAndPlayButton soundfileInstance={1} />
                    <RecordAndPlayButton soundfileInstance={2} />
                    <RecordAndPlayButton soundfileInstance={3} />
                    <RecordAndPlayButton soundfileInstance={4} />
                    <RecordAndPlayButton soundfileInstance={5} />
                </View>

                <View style={styles.recordButtonView}>
                    <TouchableOpacity style={styles.button} onPress={() => navigateWithActivePlaybackCheck()}>
                        <Text style={styles.buttonText}>Start game</Text>
                    </TouchableOpacity>
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
    recordButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
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
    recordingsView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.8,
        marginTop: 20

    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17
    },
})

export default SoundRecorder