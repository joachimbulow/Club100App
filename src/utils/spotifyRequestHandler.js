import axios from 'axios'
import authHandler from './authenticationHandler.js'
import asyncStorageHandler from './asyncStorageHandler'

class SpotifyRequestHandler {
    constructor() { }

    async getUserDisplayName() {
        let tokenObject = await this.retrieveValidatedAccessToken()
        return axios.get('https://api.spotify.com/v1/me', { headers: { "Authorization": "Bearer " + tokenObject.accessToken } })
    }

    async getPlaylists() {
        let tokenObject = await this.retrieveValidatedAccessToken()
        return axios.get('https://api.spotify.com/v1/me/playlists?limit=30', { headers: { "Authorization": "Bearer " + tokenObject.accessToken } })

    }

    async getPlaylistContent(playlistUri) {
        let tokenObject = await this.retrieveValidatedAccessToken()

        let url = 'https://api.spotify.com/v1/playlists/' + playlistUri + '/tracks'
        let headers = {
            "Authorization": "Bearer " + tokenObject.accessToken,
        }
        let params = {
            fields: "items(track(uri, name, artists))"
        }

        return axios.get(url, { params, headers })
    }


    async playNextSong() {
        let tokenObject = await this.retrieveValidatedAccessToken()
        return axios.post("https://api.spotify.com/v1/me/player/next", {}, { headers: { "Authorization": "Bearer " + tokenObject.accessToken } })
    }

    async queueSong(songUri) {
        let tokenObject = await this.retrieveValidatedAccessToken();
        return axios.post('https://api.spotify.com/v1/me/player/queue?uri=' + songUri, {}, { headers: { "Authorization": "Bearer " + tokenObject.accessToken } })
    }

    async getActivePlayback() {
        let tokenObject = await this.retrieveValidatedAccessToken();
        return axios.get('https://api.spotify.com/v1/me/player', { headers: { "Authorization": "Bearer " + tokenObject.accessToken } })
    }


    //Token handling 
    //TODO: move to auth handler
    async retrieveValidatedAccessToken() {
        let tokenObject = await asyncStorageHandler.retrieveObject("tokenObject")
        return await this.refreshAccessTokenIfNecessary(tokenObject);
    }

    async refreshAccessTokenIfNecessary(tokenObject) {
        let accessTokenExpirationDateInMillis = Date.parse(tokenObject.accessTokenExpirationDate)
        if (accessTokenExpirationDateInMillis <= Date.now()) {
            console.log("Refreshed token")
            let refreshedTokenObject = await authHandler.refreshLogin(tokenObject.refreshToken)
            asyncStorageHandler.storeObject("tokenObject", refreshedTokenObject)
            return refreshedTokenObject
        }
        return tokenObject
    }


}

const spotifyRequestHandler = new SpotifyRequestHandler();

export default spotifyRequestHandler;