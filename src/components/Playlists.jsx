import React, { useState } from 'react';
import { songs } from './PlayControls';

const Playlists = () => {
  const [showDropdown, setShowDropdown] = useState(false);    //keeps track of whether the dropdown with song options should be shown or hidden.
  const [selectedSongs, setSelectedSongs] = useState([]);   //an array that stores the IDs of the selected songs.
  const [playlist, setPlaylist] = useState([])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // It adds or removes the song ID from the selectedSongs array based on whether it's already present or not.
  const handleSongSelection = (songId) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const create = () => {
    
  };

  return (
    <div>
      <h1>Playlists</h1>
      <button onClick={toggleDropdown}>Create new playlist</button>
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
          {selectedSongs}
        </div>
      )}
    </div>
  );
};

export default Playlists;
