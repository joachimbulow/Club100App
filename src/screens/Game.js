import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Button,
    View,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native'
import AnimatedProgressWheel from 'react-native-progress-wheel';
import TextTicker from 'react-native-text-ticker';
import spotifyRequestHandler from '../utils/spotifyRequestHandler';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import KeepAwake from 'react-native-keep-awake';
import BeerFoam from '../components/beerFoamImageComponent.js'


function Game(props) {

    //Animation
    const animationRef = useRef(null)
    const mineRef = useRef(null)
    const [showAnimation, setShowAnimation] = useState(false)
    const [showMineAnimation, setShowMineAnimation] = useState(false)

    const roundTimeRef = useRef(props.route.params.difficulty);
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
    var mineSound = useRef(undefined);

    useEffect(() => {
        //ComponentDidMount

        //Initializing notificaiton sound
        Sound.setCategory('Playback');
        notificationSound.current = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) { console.log('Error loading notification sound'); return; }
        });
        mineSound.current = new Sound('mine_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) { console.log('Error loading mine sound'); return; }
        });

        initializeGame();
        KeepAwake.activate();
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
            KeepAwake.deactivate();
        }
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) {
            if (props.route.params.minefield && Math.random() < 0.05) {
                setShowMineAnimation(true)
                BackgroundTimer.setTimeout(() => { setShowMineAnimation(false); }, 5500)
                BackgroundTimer.setTimeout(() => { spotifyQueueAndPlayNextSong(); }, 5000)
                BackgroundTimer.setTimeout(() => { mineSound.current.play(() => { }); }, 350)
            }
            else {
                setShowAnimation(true)
                BackgroundTimer.setTimeout(() => { setShowAnimation(false); }, 3500)
                BackgroundTimer.setTimeout(() => { spotifyQueueAndPlayNextSong(); }, 2000)
                notificationSound.current.play(() => { })
            }

            setTimeLeft(props.route.params.difficulty)
            setRound(currentRound => currentRound + 1)

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
        spotifyRequestHandler.seekCurrentSong(30000);
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
        }, 950)
    }

    function gameStep() {
        setTimeLeft((currentTimeLeft) => currentTimeLeft - 1)
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
                <LottieView
                    source={require('../assets/animations/background_animation.json')}
                    style={{ zIndex: -2 }}
                    autoPlay={true}
                    loop={true}
                />
            </SafeAreaView>

            {/* Animation */}
            {showAnimation &&
                <View style={styles.animationView}>
                    <LottieView
                        ref={animation => {
                            animationRef.current = animation;
                        }}
                        source={require('../assets/animations/6197-beer-mug.json')}
                        style={{ zIndex: 1000 }}
                        autoPlay
                    />
                </View>}
            {showMineAnimation &&
                <View style={styles.animationView}>
                    <LottieView
                        ref={animation => {
                            mineRef.current = animation;
                        }}
                        source={require('../assets/animations/9804-dynamite.json')}
                        style={{ zIndex: 1000 }}
                        autoPlay
                    />
                </View>}
            {/* Loading */}
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
    animationView: {
        position: 'absolute',
        backgroundColor: '#F5FCFF88',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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