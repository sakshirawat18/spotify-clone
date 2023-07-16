import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { is_empty } from "../components/Utils"
import { songs } from "../components/SongData"


const PlayControls = () => {

    const [selectedSongId, setSelectedSongId] = useState();
    const [playPause, setPlayPause] = useState();
    const [playDisable, setPlayDisable] = useState(true);
    const [prevDisable, setPrevDisable] = useState(true);
    const [nextDisable, setNextDisable] = useState(true);
    const selectedSong = songs.find(item => item.id === selectedSongId);

    const playMusic = (songId) => {
        if (songId === selectedSongId) {    //user clicked on the currently playing song
            handlePause();  // Pause the song.
        } else {
            setPlayPause(true); //indicates that the song should be playing 
            setSelectedSongId(songId); //update selectedSongId 
            setPlayDisable(false);
            setPrevDisable(false);
            setNextDisable(false);
        }
    };

    const handlePause = () => {
        if (is_empty(selectedSongId)) {
            setPlayDisable(true);  // Disable the "Play" button if there is no selected song.
        }
        else {
            setPlayDisable(false); // Enable the "Play" button.
            const audioElement = document.querySelector('audio'); //accessing the DOM through document.querySelector() 
            setPlayPause(audioElement.paused);
            // console.log("========>>>>", audioElement);
            if (audioElement.paused) {
                audioElement.play();  // Play the audio element if it's paused.
            } else {
                audioElement.pause();  /// Pause the audio element if it's playing.
            }
        }

    };

    const handlePrevious = () => {
        if (is_empty(selectedSongId)) {
            setPrevDisable(true);  // Disable the "Previous" button if there is no selected song.
        }
        else {
            const currentIndex = songs.findIndex(item => item.id === selectedSongId);
            const previousIndex = (currentIndex > 0) ? currentIndex - 1 : songs.length - 1;
            setSelectedSongId(songs[previousIndex].id);  // Set the selectedSongId to the previous song in the array.
        }

    };

    const handleNext = () => {
        if (is_empty(selectedSongId)) {
            setNextDisable(true);  // Disable the "Next" button if there is no selected song.
        }
        else {
            const currentIndex = songs.findIndex(item => item.id === selectedSongId);
            const nextIndex = (currentIndex < songs.length - 1) ? currentIndex + 1 : 0;
            setSelectedSongId(songs[nextIndex].id);  // Set the selectedSongId to the next song in the array.
        }

    };

    console.log("selectedSong", is_empty(selectedSong));

    return (
        <div>
            PlayControls
            <audio src={selectedSong?.file_name} autoPlay />
            <ul>
                {songs.map((song) => (
                    <li key={song.id} onClick={() => playMusic(song.id)}>
                        {song.name} <img src={song.image} width="100" height="100" />
                    </li>
                ))}
            </ul>

            {/* displaying name of the current playing song */}
            {is_empty(selectedSong) ? "" : selectedSong.name}
            {is_empty(selectedSong) ? "" : <img src={selectedSong?.image} width="230" height="250" />}

            <button disabled={playDisable} onClick={handlePause}>
                {playPause ? "Pause" : "Play"}
            </button>
            <button disabled={prevDisable} onClick={handlePrevious}>Previous</button>
            <button disabled={nextDisable} onClick={handleNext}>Next</button>

            <Link to="/playlists">
                <button>Playlists</button>
            </Link>
        </div>
    );
}

export default PlayControls;
