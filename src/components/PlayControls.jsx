import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import Besharam from "../songs/Besharam.mp3"
import Jhoome from "../songs/Jhoome.mp3"
import Jim from "../songs/Jim.mp3"
import Pathaan from "../songs/Pathaan.mp3"
import Tumhe from "../songs/Tumhe.mp3"

export const songs = [
    {
        id: 1,
        name: "Besharam",
        file_name: Besharam,
    },
    {
        id: 2,
        name: "Jhoome",
        file_name: Jhoome,
    },
    {
        id: 3,
        name: "Jim",
        file_name: Jim,
    },
    {
        id: 4,
        name: "Pathaan",
        file_name: Pathaan,
    },
    {
        id: 5,
        name: "Tumhe",
        file_name: Tumhe,
    }
];

const PlayControls = () => {
    
    const [selectedSongIndex, setSelectedSongIndex] = useState(0);

    const [playPause, setPlayPause] = useState();

    const handlePlay = (index) => {
        if (index === selectedSongIndex) {    //user clicked on the currently playing song
            handlePause(); 
        } else {
            setPlayPause(true); //indicates that the song should be playing 
            setSelectedSongIndex(index); //update selectedSongIndex 
        }
    };
    

    const handlePause = () => {
        const audioElement = document.querySelector('audio'); //accessing the DOM through document.querySelector() 
        setPlayPause(audioElement.paused);
        console.log("========>>>>", audioElement);
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };


    const handlePrevious = () => {
        setSelectedSongIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1));
    };

    const handleNext = () => {
        setSelectedSongIndex(prevIndex => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0));
    };

    const selectedSong = songs[selectedSongIndex];

    return (
        <div>
            PlayControls
            <audio src={selectedSong.file_name} autoPlay />
            <ul>
                {songs.map((song, index) => (
                    <li key={song.id} onClick={() => handlePlay(index)}>
                        {song.name}
                    </li>
                ))}
            </ul>

            

            {/* displaying name of the song */}
            {selectedSong.name} 
            
            <button onClick={handlePause}>
                {playPause ? "Pause" : "Play"}
            </button>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>

            <Link to="/playlists">
            <button>Playlists</button>
            </Link>
        </div>
    );
}

export default PlayControls;
