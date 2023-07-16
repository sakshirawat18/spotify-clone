import React, { useState } from 'react';
import { songs } from './SongData';
import { is_empty } from "../components/Utils"

const Playlists = () => {
  const [showDropdown, setShowDropdown] = useState(false);    //keeps track of whether the dropdown with song options should be shown or hidden.
  const [selectedSongs, setSelectedSongs] = useState([]);   //an array that stores the IDs of the selected songs.
  const [playlist, setPlaylist] = useState([])  // Holds the selected songs as a playlist.
  const [selectedSongId, setSelectedSongId] = useState();
  const [playPause, setPlayPause] = useState();
  const [playDisable, setPlayDisable] = useState(true);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(true);
  const [createDisable, setCreateDisable] = useState(false);


  const selectedSong = songs.find(item => item.id === selectedSongId);   // Find the selected song based on the selectedSongId.

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);  // Toggle the visibility of the dropdown & after the click it will disable.
  };

  // It adds or removes the song ID from the selectedSongs array based on whether it's already present or not.
  const handleSongSelection = (songId) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));  // Deselect the song if it's already selected.
    } else {
      setSelectedSongs([...selectedSongs, songId]);   // Select the song if it's not already selected.
    }
  };

  const create = () => {
    const selectedSongsArray = selectedSongs.map((songId) =>
      songs.find((song) => song.id === songId)
    );
    setPlaylist(selectedSongsArray);    // Update the playlist state with the selected songs.
    setCreateDisable(true);   // Disable the "Create" button after creating the playlist.
  };

  const handlePlay = (songId) => {
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
    if (is_empty(selectedSongId)) {
      setPlayDisable(true);  // Disable the "Play" button if there is no selected song.
    }
    else {
      setPlayDisable(false);  // Enable the "Play" button.
      const audioElement = document.querySelector('audio'); //accessing the DOM through document.querySelector() 
      setPlayPause(audioElement.paused);
      // console.log("========>>>>", audioElement);
      if (audioElement.paused) {
        audioElement.play();  // Play the audio element if it's paused.
      } else {
        audioElement.pause();  // Pause the audio element if it's playing.
      }
    }
  };

  const handlePrevious = () => {
    if (is_empty(selectedSongId)) {
      setPrevDisable(true);  // Disable the "Previous" button if there is no selected song.
    }
    else {
      const currentIndex = playlist.findIndex(item => item.id === selectedSongId);
      const previousIndex = (currentIndex > 0) ? currentIndex - 1 : playlist.length - 1;
      setSelectedSongId(playlist[previousIndex].id);  // Set the selectedSongId to the previous song in the playlist.
    }
  };

  const handleNext = () => {
    if (is_empty(selectedSongId)) {
      setNextDisable(true);  // Disable the "Next" button if there is no selected song.
    }
    else {
      const currentIndex = playlist.findIndex(item => item.id === selectedSongId);
      const nextIndex = (currentIndex < playlist.length - 1) ? currentIndex + 1 : 0;
      setSelectedSongId(playlist[nextIndex].id);  // Set the selectedSongId to the next song in the playlist.
    }
  };

  return (
    <div>
      <h1>Playlists</h1>
      <button disabled={showDropdown} onClick={toggleDropdown}>Create new playlist</button>
      <audio src={selectedSong?.file_name} autoPlay />
      {showDropdown && (
        <div>
          <h3>Select Songs:</h3>
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(song.id)}
                  onChange={() => handleSongSelection(song.id)}
                />
                {song.name} <img src={song.image} width="100" height="100" />
              </li>
            ))}
          </ul>
          <button disabled={createDisable} onClick={create}>Create</button>

          <h3>Your Playlist:</h3>

          <ul>
            {playlist.map((song) => (
              <li key={song.id} onClick={() => handlePlay(song.id)}>
                {song.name} <img src={song.image} width="100" height="100" />
              </li>  // Renders each selected song as a list item with a unique key based on the song's id and displays the song's name.
            ))}
          </ul>

          {/* printing currently playing song */}
          {is_empty(selectedSong) ? "" : selectedSong.name}
          {is_empty(selectedSong) ? "" : <img src={selectedSong?.image} width="230" height="250" />}

          <button disabled={playDisable} onClick={handlePause}>
            {playPause ? "Pause" : "Play"}
          </button>
          <button disabled={prevDisable} onClick={handlePrevious}>Previous</button>
          <button disabled={nextDisable} onClick={handleNext}>Next</button>
        </div>

      )}

    </div>
  );
};

export default Playlists;
