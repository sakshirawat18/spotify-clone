import React, { useState } from 'react'
import AudioPlayer from "react-audio-player"
import { songs } from './SongData';
import { is_empty } from "../components/Utils"

const LikedSongs = ({ likedPlaylist }) => {

  const [volume, setVolume] = useState(0.5)

  let audio = new Audio(songs[0].file_name);

  const volumeControl = (e) => {
    setVolume (parseFloat(e.target.value));
  };

  return (
    <div>
      <h2>Liked Songs</h2>
      <AudioPlayer src={audio.src} volume={volume} autoPlay controls />
      <input type="range" min="0" max="1" step="0.01" onChange={volumeControl}/>

      <ul>
        {likedPlaylist.map((song) => (
          <li key={song.id}>
            {song.name}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default LikedSongs
