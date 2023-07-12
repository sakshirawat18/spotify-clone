import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import Besharam from "../songs/Besharam.mp3"
import Jhoome from "../songs/Jhoome.mp3"
import Jim from "../songs/Jim.mp3"
import Pathaan from "../songs/Pathaan.mp3"
import Tumhe from "../songs/Tumhe.mp3"
import { is_empty } from "../components/Utils"

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

    const [selectedSongId, setSelectedSongId] = useState();
    const [playPause, setPlayPause] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const playMusic = (songId) => {
        if (songId === selectedSongId) {    //user clicked on the currently playing song
            handlePause();
        } else {
            setPlayPause(true); //indicates that the song should be playing 
            setSelectedSongId(songId); //update selectedSongId 
            setIsButtonDisabled(false);
        }
    };

    const handlePause = () => {
        if (is_empty(selectedSongId)){
            setIsButtonDisabled(true);
        }
        else{
            setIsButtonDisabled(false);
            const audioElement = document.querySelector('audio'); //accessing the DOM through document.querySelector() 
            setPlayPause(audioElement.paused);
            // console.log("========>>>>", audioElement);
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }

    };

    const handlePrevious = () => {
        // setSelectedSongId(prevIndex => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1));
        const currentIndex = songs.findIndex(item => item.id === selectedSongId);
        const previousIndex = (currentIndex > 0) ? currentIndex - 1 : songs.length - 1;
        setSelectedSongId(songs[previousIndex].id);
    };

    const handleNext = () => {
        // setSelectedSongId(prevIndex => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0));
        const currentIndex = songs.findIndex(item => item.id === selectedSongId);
        const nextIndex = (currentIndex < songs.length - 1) ? currentIndex + 1 : 0;
        setSelectedSongId(songs[nextIndex].id);
    };

    const selectedSong = songs.find(item => item.id === selectedSongId);
    console.log("selectedSong", is_empty(selectedSong));

    return (
        <div>
            PlayControls
            <audio src={selectedSong?.file_name} autoPlay />
            <ul>
                {songs.map((song) => (
                    <li key={song.id} onClick={() => playMusic(song.id)}>
                        {song.name}
                    </li>
                ))}
            </ul>

            {/* displaying name of the song */}
            {is_empty(selectedSong) ? "" : selectedSong.name}

            <button disabled={isButtonDisabled} onClick={handlePause}>
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
