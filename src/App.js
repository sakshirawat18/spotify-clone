import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayControls from './components/PlayControls';
import Playlists from './components/Playlists';


function App() {
  return (
    <BrowserRouter>
    <div className="App">

     <Routes>
        <Route path="/" element={<PlayControls />} />
        <Route path="/playlists" element={<Playlists/>} />
      </Routes>




    </div>
    </BrowserRouter>
  );
}

export default App;
