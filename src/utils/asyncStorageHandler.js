import AsyncStorage from '@react-native-async-storage/async-storage';


class AsyncStorageHandler {
    constructor() { }

    async storeString(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            alert("Something went wrong when saving the data.")
        }
    }
    async storeObject(key, value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
            alert("Something went wrong when saving the data.")
        }
    }

    async retrieveString(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (e) {
            // error reading value
            alert("Something went wrong when retrieving the data.")
        }
    }

    async retrieveObject(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            alert("Something went wrong when retrieving the data.")
        }
    }
}

const asyncStorageHandler = new AsyncStorageHandler();

export default asyncStorageHandler;

