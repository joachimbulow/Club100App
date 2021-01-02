import { authorize, refresh } from 'react-native-app-auth';
import asyncStorageHandler from './asyncStorageHandler.js';
import { CLIENT_SECRET } from '../constants.js'
import axios from 'axios'

class AuthenticationHandler {
    constructor() {
        this.spotifyAuthConfig = {
            clientId: 'b5b960a874e54e7996741fcc3ca59684',
            //Move secret to backend, and switch skipCodeExchange to true
            clientSecret: CLIENT_SECRET,
            redirectUrl: 'com.club100://oauthredirect',
            scopes: [
                'user-read-playback-state',
                'playlist-read-private',
                'user-modify-playback-state',
                'user-read-private',
            ],
            usePKCE: false,
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
            skipCodeExchange: true
        };
    }

    async onLogin() {
        try {
            const result = await authorize(this.spotifyAuthConfig);
            if (result.authorizationCode) {
                let tokenResult = await axios.get('http://10.0.2.2:8000/authorizespotify/' + result.authorizationCode)
                //Set token expiration date time
                tokenResult.data.tokenExpirationDate = Date.now() + (tokenResult.data.expires_in * 1000);
                await asyncStorageHandler.storeObject('tokenObject', tokenResult.data);
                return true;
            }
            else {
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    async refreshLogin(tokenObject) {

        return result;
    }

    //Token handling 
    async retrieveValidatedAccessTokenObject() {
        let tokenObject = await asyncStorageHandler.retrieveObject("tokenObject")
        return await this.refreshAccessTokenIfNecessary(tokenObject);
    }

    async refreshAccessTokenIfNecessary(tokenObject) {
        if (tokenObject.tokenExpirationDate <= Date.now()) {
            console.log("Refreshing token")
            const refreshResult = await axios.get("http://10.0.2.2:8000/refreshspotifytoken/" + tokenObject.refresh_token)
            tokenObject.access_token = refreshResult.data.access_token
            tokenObject.tokenExpirationDate = Date.now() + (refreshResult.data.expires_in * 1000);
            asyncStorageHandler.storeObject("tokenObject", tokenObject)
            return tokenObject
        }
        return tokenObject
    }


}

const authHandler = new AuthenticationHandler();

export default authHandler;