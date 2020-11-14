import { authorize, refresh } from 'react-native-app-auth';
import asyncStorageHandler from './asyncStorageHandler.js';
import { CLIENT_SECRET } from '../constants.js'

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
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
            skipCodeExchange: false
        };
    }

    async onLogin() {
        try {
            const result = await authorize(this.spotifyAuthConfig);
            console.log(result)
            if (result.accessToken) {
                console.log(result.accessToken)
                await asyncStorageHandler.storeObject('tokenObject', result);
                return true;
            }
            else {
                return false;
            }

        } catch (error) {
            console.log("Exception in authorization. " + error)
            return false;
        }
    }

    async refreshLogin(refreshToken) {
        const result = await refresh(this.spotifyAuthConfig, {
            refreshToken: refreshToken,
        });
        return result;
    }


}

const authHandler = new AuthenticationHandler();

export default authHandler;