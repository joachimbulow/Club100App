import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native'
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import BeerFoam from '../components/beerFoamImageComponent.js'

function Settings(props) {
    const [playlistUri] = useState(props.route.params.playlistUri);
    const [difficulty, setDifficulty] = useState(60);
    const [minefield, setMinefield] = useState(false);
    const [shuffleMusic, setShuffleMusic] = useState(false);

    useEffect(() => {
    }, [])

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
                <View style={styles.checkboxContainerView}>

                    <Text style={styles.settingTextStyle}>Difficulty (seconds per shot)</Text>
                    <View style={styles.checkboxView}>
                        <CheckBox
                            center
                            title='Normal (60 sec)'
                            checked={difficulty == 60}
                            onPress={() => setDifficulty(60)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}

                        />
                        <CheckBox
                            center
                            title='Hard (50 sec)'
                            checked={difficulty == 50}
                            onPress={() => setDifficulty(50)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />

                    </View>
                    <View style={styles.checkboxView}>
                        <CheckBox
                            center
                            title='Extreme (40 sec)'
                            checked={difficulty == 40}
                            onPress={() => setDifficulty(40)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />
                    </View>

                    <View style={styles.minefieldTextView}>
                        <Text style={styles.settingTextStyle}>Minefield</Text>
                        <TouchableOpacity style={styles.popupDialogButton} onPress={() => Alert.alert('Minefield', "If you enable minefield, every round there is a small chance (4%) that a bomb animation will be shown, and an explosion sound. In that case, it is recommended to drink a shot of liquor instead of beer, but the \"punishment\" can be decided by the players.")}>
                            <Text style={styles.settingTextStyle}>?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.difficultyCheckboxView}>
                        <CheckBox
                            center
                            title='No'
                            checked={!minefield}
                            onPress={() => setMinefield(false)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />
                        <CheckBox
                            center
                            title='Yes'
                            checked={minefield}
                            onPress={() => setMinefield(true)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />
                    </View>
                    <Text style={styles.settingTextStyle}>Shuffle music</Text>
                    <View style={styles.checkboxView}>
                        <CheckBox
                            center
                            title='No'
                            checked={!shuffleMusic}
                            onPress={() => setShuffleMusic(false)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />
                        <CheckBox
                            center
                            title='Yes'
                            checked={shuffleMusic}
                            onPress={() => setShuffleMusic(true)}
                            containerStyle={{ backgroundColor: "#FFCC00" }}
                            checkedIcon={<Icon name="beer" size={24} color="black" />}
                        />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('SettingsConfirm',
                        {
                            playlistUri: playlistUri,
                            difficulty: difficulty,
                            minefield: minefield,
                            shuffleMusic: shuffleMusic
                        })}>
                        <Text style={styles.buttonText}>
                            Continue
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
    checkboxContainerView: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxView: {
        flexDirection: 'row',
        marginBottom: 15
    },
    difficultyCheckboxView: {
        flexDirection: 'row'
    },
    settingTextStyle: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#EAFF00',
        borderWidth: 2,

    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 13
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    minefieldTextView: {
        flexDirection: 'row'
    },
    popupDialogButton: {
        backgroundColor: "rgba(255,255,255,0.5)",
        paddingHorizontal: 10,
        marginLeft: 10,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
    }

})

export default Settings