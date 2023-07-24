import React, { useState } from 'react'
import { songs } from './SongData';
import { is_empty } from "../components/Utils"

const LikedSongs = ({ likedPlaylist }) => {

 
  console.log("======>", likedPlaylist)
    return (
      <div>
        <h2>Liked Songs</h2>
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
