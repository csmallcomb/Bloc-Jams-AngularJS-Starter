(function() {
    function SongPlayer(Fixtures) {
        /**
        * @desc Empty object with an array that will hold song player content
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc Stores album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

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
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            /**
            * @function getSongIndex
            * @type {Object}
            */
            var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
            };

            /**
            * @desc Active song object from list of songs
            * @type {Object}
            */
            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Plays selected song
        * @param {Object} song
        */
        var playSong = function() {
            currentBuzzObject.play();
            song.playing = true;
        }

        /**
        * @function stopSong
        * @desc Stops currently playing song
        * @param {Object} song
        */
        var stopSong = function() {
            currentBuzzObject.stop();
            song.playing = null;

        }

        /**
        * @desc Current song playing
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);
                    }
                }
        };

        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous
        * @desc Go to and play previously played song
        * @param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function next
        * @desc Go to and play next song in order
        * @param {Object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }

        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
