import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { is_empty } from "../components/Utils"
import { songs } from "../components/SongData"
import { Slider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import "../style/Footer.css"
import "../style/PlayControls.css"
import dailyMix1 from "../assets/dailyMix1.jpeg"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import WrapTextRoundedIcon from '@mui/icons-material/WrapTextRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

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

    // console.log("selectedSong", is_empty(selectedSong));

    return (
        <div>
            <div className="container">
                <div className="leftContainer">
                    <div className="leftTop"></div>
                    <div className="leftBottom"></div>
                </div>

                <div className="mainContainer">
                    <div className="heading">
                        <div className="headingImage">
                            <img src={dailyMix1} height="232px" width="232px" />
                        </div>
                        <div className="headingContent">
                            <span className="playlist">Playlist</span>
                            <span>
                                <h1 className="dailyMix1">Daily Mix 1</h1>
                            </span>
                            <span className="aristsName">Kid Travis, dj Shawny, R3YAN and more</span>
                        </div>
                    </div>
                    <div className="heading2"></div>
                    <div className="table">
                        <TableContainer className='tableContainer'>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Artist</TableCell>
                                        <TableCell><AccessTimeRoundedIcon sx={{ color: "hsla(0,0%,100%,.7)", width: "16px", height: "16px" }} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songs.map((song, index) => (
                                        <TableRow key={song.id}
                                            onClick={() => playMusic(song.id)}
                                            className="tableRow"
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <img src={song.image} alt={song.name} width="50" height="50" />
                                                <div>
                                                    <span>{song.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{song.artist}</TableCell>
                                            <TableCell>{song.timeStamp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <audio src={selectedSong?.file_name} autoPlay />

            {/* <Link to="/playlists">
                <button>Playlists</button>
            </Link> */}
    

        <div className='bottomNavigation'>
            <div className="left">
                {/* displaying name of the current playing song */}
                {is_empty(selectedSong) ? "" : <img src={selectedSong?.image} width="230" height="250" />}
                <div className="currentPlayingSong">
                    <div className="musicName">
                        {is_empty(selectedSong) ? "" : selectedSong.name}
                    </div>
                    <div className="artistName">
                        {is_empty(selectedSong) ? "" : selectedSong.artist}
                    </div>
                </div>
                {is_empty(selectedSong) ? "" : <FavoriteBorderIcon className='heartIcon' sx={{ color: "hsla(0,0%,100%,.7)", width: "16px", height: "16px" }} />
                }
            </div>

            <div className="center">
                <div className="controls">
                    <ShuffleIcon sx={{ color: "white", width: "16px", height: "16px" }} />

                    <button className='prevBtn' disabled={prevDisable} onClick={handlePrevious}>
                        <SkipPreviousIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                    </button>

                    <button className='playPauseBtn' disabled={playDisable} onClick={handlePause}>
                        {playPause ? <PauseCircleIcon sx={{ color: "white", width: "32px", height: "32px" }} />
                            : <PlayCircleIcon sx={{ color: "white", width: "32px", height: "32px" }} />}
                    </button>

                    <button className='nextBtn' disabled={nextDisable} onClick={handleNext}>
                        <SkipNextIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                    </button>

                    <RepeatIcon sx={{ color: "white", width: "16px", height: "16px" }} />

                </div>

                <div className="slider">
                    <div className="timer">0:01</div>
                    <Slider
                        sx={{ width: "80%", color: '#fff' }}
                        size="small"
                        defaultValue={50}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                    <div className="totalTime">3:00</div>
                </div>
            </div>

            <div className="right">
                <QueueMusicRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);", width: "20px", height: "20px" }} />
                <WrapTextRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);", width: "20px", height: "20px" }} />
                <VolumeUpRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);", width: "20px", height: "20px" }} />
                <Slider
                    sx={{ width: "25%", color: '#fff' }}
                    size="small"
                    defaultValue={50}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </div>
        </div>
    
        </div >
    );
}

export default PlayControls;
