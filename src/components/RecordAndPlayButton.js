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
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";

function RecordAndPlayButton(props) {

    return (
        <View style={styles.recordingView}>
            <Text style={styles.recordingText}>Recording #{props.soundfileInstance}</Text>
            <TouchableOpacity styles={styles.soundButton}>
                {/* Wrapping in view to make margin work */}
                <View style={{ marginRight: 20 }}>
                    <Icon name="play" size={24} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity styles={styles.soundButton}>
                <Icon name="microphone" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    recordingView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 20,
        width: '80%',
        height: '19%',
        marginBottom: '1%'

    },
    recordingText: {
        marginRight: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    soundButton: {
    },
})

export default RecordAndPlayButton