import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayControls from './components/PlayControls';
import Playlists from './components/Playlists';
import { useEffect, useState } from 'react';
import LikedSongs from './components/LikedSongs';
import { songs } from './components/SongData';


function App() {
  const [likedSongsId, setLikedSongsId] = useState([]);
  const [likedPlaylist, setLikedPlaylist] = useState([])

  // Function to update the likedPlaylist state based on likedSongsId array
  const updateLikedPlaylist = () => {
    const likedSongsArray = likedSongsId.map((songId) =>
      songs.find((song) => song.id === songId)
    );
    setLikedPlaylist(likedSongsArray);
  };

  // Call updateLikedPlaylist whenever likedSongs state changes
  useEffect(() => {
    updateLikedPlaylist();
  }, [likedSongsId]);

  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
        <Route path="/" element={<PlayControls likedSongsId={likedSongsId} setLikedSongsId={setLikedSongsId}/>} />
        <Route path="/playlists" element={<Playlists/>} />
        <Route path="/likedsongs" element={<LikedSongs likedPlaylist={likedPlaylist}/>} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
