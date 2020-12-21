import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Button,
    ScrollView,
    View,
    Linking,
    TouchableHighlight,
    RefreshControl,
    ActivityIndicator,
    Dimensions,
    Image,
    Alert
} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import AnimatedProgressWheel from 'react-native-progress-wheel';
import TextTicker from 'react-native-text-ticker';
import authHandler from '../utils/authenticationHandler';
import spotifyRequestHandler from '../utils/spotifyRequestHandler';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';

function Game(props) {

    const roundTimeRef = useRef(props.route.params.difficulty);
    const minefieldRef = useRef(props.route.params.minefield);
    const shuffleMusicRef = useRef(props.route.params.shuffleMusic);
    const playlistRef = useRef([]);

    //Game state
    const [loading, setLoading] = useState(true)
    const [timeLeft, setTimeLeft] = useState(props.route.params.difficulty);
    const [round, setRound] = useState(1);
    const [currentlyPlaying, setCurrentlyPlaying] = useState("")

    const upcomingSongIndexRef = useRef(0);

    let beerConsumed = (round * 2) - 2;

    var notificationSound = useRef(undefined);


    useEffect(() => {
        //ComponentDidMount

        //Initializing notificaiton sound
        Sound.setCategory('Playback');
        notificationSound.current = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) { console.log('Error loading notification sound'); return; }
        });

        initializeGame();
        props.navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {
                    Alert.alert(
                        "Quit game", "Are you sure?",
                        [{ text: "Cancel", style: "cancel" }, { text: "Quit", onPress: () => { BackgroundTimer.stopBackgroundTimer(); props.navigation.navigate('MainMenu') } }],
                        { cancelable: false }
                    );
                }
                } title="Quit" color="black"></Button>
            )
        });

        //ComponentWillUnmount
        return () => {
            BackgroundTimer.stopBackgroundTimer();
            notificationSound.current.release();
        }
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(props.route.params.difficulty)
            setRound(currentRound => currentRound + 1)
            spotifyQueueAndPlayNextSong();
            notificationSound.current.play((success) => { })
        }

    }, [timeLeft]);


    async function initializeGame() {
        spotifyRequestHandler.getPlaylistContent(props.route.params.playlistUri)
            .then(async (result) => {
                let playlistContent = result.data.items
                if (shuffleMusicRef.current) {
                    playlistContent.sort(() => Math.random() - 0.5)
                }
                playlistRef.current = playlistContent
                await spotifyQueueAndPlayNextSong();
                startInterval();
                setLoading(false);
            })
    }


    async function spotifyQueueAndPlayNextSong() {
        await spotifyRequestHandler.queueSong(playlistRef.current[upcomingSongIndexRef.current].track.uri);
        await spotifyRequestHandler.playNextSong();
        setCurrentlyPlayingWithFormat((upcomingSongIndexRef.current) % playlistRef.current.length);

        // Incrementing index of next song
        upcomingSongIndexRef.current = (upcomingSongIndexRef.current + 1) % playlistRef.current.length;
    }

    function setCurrentlyPlayingWithFormat(index) {
        setCurrentlyPlaying(playlistRef.current[index].track.name + "   -   " + playlistRef.current[index].track.artists[0].name)
    }

    function startInterval() {
        BackgroundTimer.runBackgroundTimer(() => {
            gameStep()
        }, 1000)
    }

    function gameStep() {
        setTimeLeft((currentTimeLeft) => currentTimeLeft - 1)
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
                <View style={styles.roundTextView}>
                    <Text style={styles.roundText}>Round {round}:</Text>
                    <Text style={styles.roundText}>{beerConsumed} cl beer consumed</Text>
                </View>
                <View style={styles.progressBarView}>
                    <AnimatedProgressWheel
                        progress={100 - (100 * (timeLeft / roundTimeRef.current))}
                        animateFromValue={0}
                        color={'gray'}
                        backgroundColor={'yellow'}
                    />
                    <Text style={styles.timerText}>{timeLeft}</Text>

                </View>
                <View style={styles.nowPlayingView}>
                    <Text style={styles.nowPlayingText}>Now playing:</Text>
                    <TextTicker
                        style={{ fontSize: 45, fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        duration={9000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}
                    >
                        {currentlyPlaying}
                    </TextTicker>
                </View>
            </SafeAreaView>
            {loading && <View style={styles.loading}>
                <Text style={styles.activityIndicatorText}>Initializing game, please wait...</Text>
                <ActivityIndicator size='large' />
            </View>}
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
    roundTextView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17
    },
    progressBarView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    timerText: {
        position: 'absolute',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 35
    },
    nowPlayingView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
        marginTop: 30
    },
    nowPlayingText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17
    },
    loading: {
        position: 'absolute',
        backgroundColor: '#F5FCFF88',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Game