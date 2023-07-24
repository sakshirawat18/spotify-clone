import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { is_empty } from "../components/Utils"
import { songs } from "../components/SongData"
import { Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import "../style/Footer.css"
import "../style/PlayControls.css"
import dailyMix1 from "../assets/dailyMix1.jpeg"
import nowPlaying from "../assets/now_playing.gif"
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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const PlayControls = ({ likedSongsId, setLikedSongsId }) => {

    const [selectedSongId, setSelectedSongId] = useState();
    const [playPause, setPlayPause] = useState();
    const [playDisable, setPlayDisable] = useState(true);
    const [prevDisable, setPrevDisable] = useState(true);
    const [nextDisable, setNextDisable] = useState(true);
    const [shuffleDisable, setShuffleDisable] = useState(true);
    const [likeBtn, setLikeBtn] = useState(false);

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
            setShuffleDisable(false);
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

    const handleShuffle = () => {
        return songs.sort(() => Math.random() - 0.5);
    }

    const handleLikedSong = (songId) => {
        if (likedSongsId?.includes(songId)) {
            setLikedSongsId(likedSongsId.filter((id) => id !== songId));  // Deselect the song if it's already selected.
        } else {
            setLikedSongsId([...likedSongsId, songId])   // Select the song if it's not already selected.
        }
        console.log("---------like", likeBtn)
    }

    // Update the likeBtn state based on whether the song is currently liked or not.
    // We will use the selectedSongId to check if the song is liked or not.
    useEffect(() => {
        setLikeBtn(likedSongsId?.includes(selectedSongId));
    }, [likedSongsId, selectedSongId]);


    // console.log("selectedSong", is_empty(selectedSong));

    return (
        <div>
            {/* <Link to="/playlists">
                <button>Playlists</button>
            </Link> */}
            <div className="container">
                <div className="mainContainer">
                    <div className="leftContainer">
                        <div className="leftSubContainer">
                            <div className="leftTop">

                            </div>
                            <div className="leftBottom">
                                <div className="leftSubBottom">
                                    <div className="libIcons">
                                        <LibraryMusicRoundedIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                                        <AddRoundedIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                                        <ArrowForwardRoundedIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                                    </div>
                                    <div className="playlistColumn">
                                        <div className="playlistColumnButtons">
                                            playlistColumnButtons
                                            <SearchRoundedIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                                        </div>
                                        <div className="playlistColumnTable">
                                            <ul className="playlistCTL">
                                                <li className="listItem">
                                                    <Link to='/likedsongs'>
                                                        LikedSongs
                                                    </Link>
                                                    {likedSongsId.length}
                                                </li>
                                            </ul>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer">
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
                        <div className="middleContainer">
                            <div className="middleContainerContent">
                                <button className="playBtn" onClick={handlePause}>
                                    {playPause ? <PauseCircleIcon sx={{ color: "#1DB954", width: "70px", height: "70px" }} />
                                        : <PlayCircleIcon sx={{ color: "#1DB954", width: "70px", height: "70px" }} />
                                    }
                                </button>
                                <button className="favBtn">
                                    <FavoriteSharpIcon sx={{ color: "#1DB954", width: "32px", height: "32px" }} />
                                </button>
                                <button className="threeDot">
                                    <MoreHorizRoundedIcon sx={{ color: "hsla(0, 0%, 100%, .7)", width: "32px", height: "32px" }} />
                                </button>
                            </div>
                        </div>
                        <div className="table">
                            <TableContainer className='tableContainer'>
                                <Table stickyHeader className='stickyHeader'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Artist</TableCell>
                                            <TableCell> </TableCell>
                                            <TableCell> <AccessTimeRoundedIcon sx={{ color: "hsla(0,0%,100%,.7)", width: "16px", height: "16px" }} /> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {songs.map((song, index) => (
                                            <TableRow key={song.id}>
                                                <TableCell>{selectedSongId === song.id ? <img className='nowPlaying' src={nowPlaying} /> : index + 1}</TableCell>
                                                <TableCell>
                                                    <div className="songInfo">
                                                        <img src={song.image} width="50" height="50" />
                                                        <div className="songName" onClick={() => playMusic(song.id)}>
                                                            {song.name}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{song.artist}</TableCell>
                                                <TableCell className="hoverTableCell">
                                                    <button className='heartIconBtn' onClick={() => handleLikedSong(song.id)}>
                                                        {likedSongsId?.includes(song.id) ? (
                                                            <FavoriteRoundedIcon sx={{ color: "#1DB954", width: "16px", height: "16px" }} />
                                                        ) : (
                                                            <FavoriteBorderRoundedIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                                                        )}
                                                    </button>
                                                </TableCell>
                                                <TableCell>{song.timeStamp}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
                <div className='footerContainer'>
                    <div className="leftFooter">
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

                    <div className="centerFooter">
                        <div className="controls">
                            <button className="shuffleBtn" disabled={prevDisable} onClick={handleShuffle}>
                                <ShuffleIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                            </button>

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

                    <div className="rightFooter">
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
            </div>
            <audio src={selectedSong?.file_name} autoPlay />



        </div >
    );
}

export default PlayControls;
