import { BottomNavigation, Slider, } from '@mui/material'
import "../style/Footer.css"
import babydoll from "../assets/babydoll.jpeg"
import React from 'react'
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


const Footer = () => {
    return (
        <div>
            <div className='bottomNavigation'>
                <div className="left">
                    <img src={babydoll} alt="" />
                    <div className="currentPlayingSong">
                        <div className="musicName">
                            Dancin Krono
                        </div>
                        <div className="artistName">
                            artist
                        </div>
                    </div>
                    <FavoriteBorderIcon className='heartIcon' sx={{ color: "white" }} />
                </div>

                <div className="center">
                    <div className="controls">
                        <ShuffleIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                        <SkipPreviousIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                        <PlayCircleIcon sx={{ color: "white", width: "32px", height: "32px" }} />
                        <SkipNextIcon sx={{ color: "white", width: "16px", height: "16px" }} />
                        <RepeatIcon sx={{ color: "white", width: "16px", height: "16px" }} />

                    </div>

                    <div className="slider">
                        <div className="timer">0:01</div>
                        <Slider
                            sx={{ width: "80%", color: '#fff'}}
                            size="small"
                            defaultValue={50}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                        />
                        <div className="totalTime">3:00</div>
                    </div>
                </div>

                <div className="right">
                    <QueueMusicRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);", width: "20px", height: "20px"}} />
                    <WrapTextRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);",width: "20px", height: "20px" }} />
                    <VolumeUpRoundedIcon sx={{ color: "hsla(0,0%,100%,.7);", width: "20px", height: "20px" }} />
                    <Slider
                        sx={{ width: "25%", color:  '#fff'  }}
                        size="small"
                        defaultValue={50}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer
