import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ActivityIndicator,
    Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import authHandler from '../utils/authenticationHandler.js'
import spotifyRequestHandler from '../utils/spotifyRequestHandler.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import BeerFoam from '../components/beerFoamImageComponent.js'

function Authorization(props) {

    const [hasToken, setHasToken] = useState(false)
    const [tokenUserDisplayName, setTokenUserDisplayName] = useState(null)

    async function authorizeAccount() {
        if (await authHandler.onLogin()) {
            spotifyRequestHandler.getUserDisplayName()
                .then(response => {
                    if (response.data.display_name) {
                        setTokenUserDisplayName(response.data.display_name);
                    }
                    else {
                        setTokenUserDisplayName("*no display name found*");
                    }
                    setHasToken(true);
                })
        }
        else {
            alert("Something went wrong during authorization. Try again.")
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <BeerFoam></BeerFoam>
                <View style={styles.headerView}>
                    <Text style={styles.header}>
                        Authorize your account
                </Text>
                </View>
                <View style={styles.imageView}>
                    <Image
                        source={require('../assets/beer.png')}
                        style={styles.headerImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={styles.isAuthorizedView}>
                    <Text style={styles.label}>Active access token: </Text>
                    {hasToken &&
                        <>
                            <Icon name="check-circle" size={24} color="green" />
                            <View></View>
                        </>
                    }
                    {!hasToken &&
                        <Icon name="times" size={24} color="red" />
                    }
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.authorizeLabelView}>
                        {!tokenUserDisplayName && <Text style={styles.label}>You must authorize your account to continue</Text>}
                        {tokenUserDisplayName && <Text style={styles.label}>Not you: {tokenUserDisplayName} ?</Text>}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => authorizeAccount()}>
                        <Text style={styles.buttonText}>
                            Authorize
                        </Text>
                    </TouchableOpacity>
                    {hasToken && <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('PlaylistPicker')}>
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </TouchableOpacity>}
                    {!hasToken && <TouchableOpacity disabled={true} style={styles.disabledButton}>
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </TouchableOpacity>}
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
        flex: 0.1,
    },
    header: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    headerImage: {
        height: 150,
        width: 150,
    },
    imageView: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.25,
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
    disabledButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        margin: 15,
        borderRadius: 100,
        backgroundColor: '#EAFF00',
        borderWidth: 2,
        opacity: 0.1
    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20
    },
    isAuthorizedView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 0.1,
        borderWidth: 2,
        marginHorizontal: 50
    },
    authorizeLabelView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 15
    },

})

export default Authorization;