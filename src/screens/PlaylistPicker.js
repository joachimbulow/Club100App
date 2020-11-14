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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from 'react-native-elements';
import spotifyRequestHandler from '../utils/spotifyRequestHandler.js'

function PlaylistPicker(props) {

    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Fetch playlists here
        if (playlists.length == 0) {
            loadPlaylists();
        }
    }, []);

    async function loadPlaylists() {
        setLoading(true);
        spotifyRequestHandler.getPlaylists()
            .then((playlistResult) => {
                setPlaylists(playlistResult.data.items)
                setLoading(false);
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
                <View style={styles.pickPlaylistTextView}>
                    <Text style={styles.pickPlaylistText}>Pick a playlist for your game</Text>
                </View>
                {loading &&
                    <View style={styles.ActivityIndicatorView}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                }

                <ScrollView style={styles.playlistScrollView}>
                    {playlists.map((playlist, index) => {
                        return (
                            <TouchableOpacity style={styles.playlistView} key={index} onPress={() => props.navigation.navigate("Settings", { playlistUri: playlist.uri.substring(17) })}>
                                <Text>{playlist.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

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
    pickPlaylistTextView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickPlaylistText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
    playlistScrollView: {
        marginTop: 20,
        marginBottom: 40
    },
    playlistView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        height: 50,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderWidth: 2,
    },
    ActivityIndicatorView: {
        marginTop: 50
    }



})

export default PlaylistPicker