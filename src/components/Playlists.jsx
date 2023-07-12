import React, { useState } from 'react';
import { songs } from './PlayControls';

const Playlists = () => {
  const [showDropdown, setShowDropdown] = useState(false);    //keeps track of whether the dropdown with song options should be shown or hidden.
  const [selectedSongs, setSelectedSongs] = useState([]);   //an array that stores the IDs of the selected songs.
  const [playlist, setPlaylist] = useState([])  // Holds the selected songs as a playlist.
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const selectedSong = songs[selectedSongIndex];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
  };

  const handlePlay = (index) => {
  setSelectedSongIndex(index)
    console.log("index", index);
};


  return (
    <div>

      <h1>Playlists</h1>
      <button onClick={toggleDropdown}>Create new playlist</button>
      <audio src={selectedSong.file_name} autoPlay />

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
                {song.name}
              </li>
            ))}
          </ul>
          <button onClick={create}>Create</button>

          <h3>Your Playlist:</h3>
          <ul>
            {playlist.map((song, index) => (
              <li key={song.id} onClick={() => handlePlay(index)}>
                {song.name}
              </li>  // Renders each selected song as a list item with a unique key based on the song's id and displays the song's name.
            ))}
          </ul>
        </div>
        
      )}
          
    </div>
  );
};

export default Playlists;
