import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Dimensions
} from "react-native";


function BeerFoamImageComponent(props) {

    const deviceWidth = Dimensions.get('window').width;

    return (
        <>
            <View style={styles.beerFoamImageView}>
                <Image
                    source={require('../assets/beerfoam.png')}
                    style={{ height: 220, width: deviceWidth }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>



        </>
    )
}

const styles = StyleSheet.create({
    beerFoamImageView: {
        position: 'absolute',
        zIndex: -1,
        right: 0,
        left: 0,
        top: 0,
    }

})

export default BeerFoamImageComponent;