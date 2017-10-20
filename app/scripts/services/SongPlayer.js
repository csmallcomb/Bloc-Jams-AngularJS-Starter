(function() {
    function SongPlayer() {
        /**
        * @desc Empty object with an array that will hold song player content
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc Current song playing
        * @type {Object}
        */
        var currentSong = null;

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };

        /**
        * @function playSong
        * @desc Plays selected song
        * @param {Object} song
        */
        var playSong = function(){
            currentBuzzObject.play();
            song.playing = true;
        }

        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                } else if (currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);
                    }
                }
        };

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
