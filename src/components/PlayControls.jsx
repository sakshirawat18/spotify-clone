import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import Besharam from "../songs/Besharam.mp3"
import AgarTumMilJao from "../songs/AgarTumMilJao.mp3"
import DilDooba from "../songs/DilDooba.mp3"
import VandeMataram from "../songs/VandeMataram.mp3"
import ZaraZara from "../songs/ZaraZara.mp3"
import { is_empty } from "../components/Utils"

export const songs = [
    {
        id: 1,
        name: "Besharam",
        file_name: Besharam,
    },
    {
        id: 2,
        name: "AgarTumMilJao",
        file_name: AgarTumMilJao,
    },
    {
        id: 3,
        name: "DilDooba",
        file_name: DilDooba,
    },
    {
        id: 4,
        name: "VandeMataram",
        file_name: VandeMataram,
    },
    {
        id: 5,
        name: "ZaraZara",
        file_name: ZaraZara,
    }
];

const PlayControls = () => {

    const [selectedSongId, setSelectedSongId] = useState();
    const [playPause, setPlayPause] = useState();
    const [playDisable, setPlayDisable] = useState(true);
    const [prevDisable, setPrevDisable] = useState(true);
    const [nextDisable, setNextDisable] = useState(true);
    const selectedSong = songs.find(item => item.id === selectedSongId);

    const playMusic = (songId) => {
        if (songId === selectedSongId) {    //user clicked on the currently playing song
            handlePause();
        } else {
            setPlayPause(true); //indicates that the song should be playing 
            setSelectedSongId(songId); //update selectedSongId 
            setPlayDisable(false);
            setPrevDisable(false);
            setNextDisable(false);
        }
    };

    const handlePause = () => {
        if (is_empty(selectedSongId)){
            setPlayDisable(true);
        }
        else{
            setPlayDisable(false);
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
        if (is_empty(selectedSongId)){
            setPrevDisable(true);
        }
        else{
            const currentIndex = songs.findIndex(item => item.id === selectedSongId);
            const previousIndex = (currentIndex > 0) ? currentIndex - 1 : songs.length - 1;
            setSelectedSongId(songs[previousIndex].id);
        }
        
    };

    const handleNext = () => {
        if (is_empty(selectedSongId)){
            setNextDisable(true);
        }
        else{
            const currentIndex = songs.findIndex(item => item.id === selectedSongId);
            const nextIndex = (currentIndex < songs.length - 1) ? currentIndex + 1 : 0;
            setSelectedSongId(songs[nextIndex].id);
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
                        {song.name}
                    </li>
                ))}
            </ul>

            {/* displaying name of the song */}
            {is_empty(selectedSong) ? "" : selectedSong.name}

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
