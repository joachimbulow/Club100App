import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ActivityIndicator,
    Image,
    Dimensions
} from "react-native";
//import { Image } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import BeerFoam from '../components/beerFoamImageComponent.js'

function MainMenu(props) {

    const deviceWidth = Dimensions.get('window').width;

    return (
        <>
            <SafeAreaView style={styles.container}>
                <BeerFoam></BeerFoam>
                <View style={styles.headerView}>
                    <Text style={styles.mainMenuHeader}>
                        Welcome to Club 100
                </Text>
                </View>
                <View style={styles.imageView}>
                    <Image
                        source={require('../assets/beer.png')}
                        style={styles.headerImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Authorization')}>
                        <Text style={styles.buttonText}>
                            Play
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('HowToPlay')}>
                        <Text style={styles.buttonText}>
                            How to play
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('About')}>
                        <Text style={styles.buttonText}>
                            About
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
        backgroundColor: "#FFCC00",
        flex: 1
    },
    headerView: {
        flex: 0.1
    },
    mainMenuHeader: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    headerImage: {
        height: 200,
        width: 200,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.4,
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.4,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        margin: 15,
        borderRadius: 100,
        backgroundColor: '#EAFF00',
        borderWidth: 2,

    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20
    }
})

export default MainMenu;