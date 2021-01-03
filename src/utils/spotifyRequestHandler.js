import axios from 'axios'
import authHandler from './authenticationHandler.js'

class SpotifyRequestHandler {
    constructor() { }

    async getUserDisplayName() {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject()
        return axios.get('https://api.spotify.com/v1/me', { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async getPlaylists() {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject()
        return axios.get('https://api.spotify.com/v1/me/playlists?limit=30', { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async getPlaylistContent(playlistUri) {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject()

        let url = 'https://api.spotify.com/v1/playlists/' + playlistUri + '/tracks'
        let headers = {
            "Authorization": "Bearer " + tokenObject.access_token,
        }
        let params = {
            fields: "items(track(uri, name, artists))"
        }

        return axios.get(url, { params, headers })
    }


    async playNextSong() {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject()
        return axios.post("https://api.spotify.com/v1/me/player/next", {}, { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async queueSong(songUri) {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject();
        return axios.post('https://api.spotify.com/v1/me/player/queue?uri=' + songUri, {}, { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async seekCurrentSong(millis) {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject();
        return axios.put('https://api.spotify.com/v1/me/player/seek?position_ms=' + millis, {}, { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async getActivePlayback() {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject();
        return axios.get('https://api.spotify.com/v1/me/player', { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }

    async getUserProfile() {
        let tokenObject = await authHandler.retrieveValidatedAccessTokenObject();
        return axios.get('https://api.spotify.com/v1/me', { headers: { "Authorization": "Bearer " + tokenObject.access_token } })
    }


}

const spotifyRequestHandler = new SpotifyRequestHandler();

export default spotifyRequestHandler;