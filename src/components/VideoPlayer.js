import React, { useRef, useState} from "react";
import { FaPlay, FaPause, FaCompress, FaExpand } from "react-icons/fa6";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import useVideoState from "../utils/useVideoState";
import useFullscreen from "../utils/useFullscreen";
import useKeyboardShortcuts from "../utils/useKeyboradShortcuts";

const VideoPlayer = ({ video }) => {

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const toggleMute = () => {
    const videoElement = videoRef.current;
    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      videoElement.volume = volume;
    } else {
      videoElement.volume = 0;
    }
  };
  
  const {
    isPlaying,
    currentTime,
    setCurrentTime,
    duration,
    playbackSpeed,
    handlePlayPause,
    handleSpeedChange,
  } = useVideoState(videoRef, video);

  const { isFullscreen, toggleFullscreen } = useFullscreen(videoRef);

  useKeyboardShortcuts(handlePlayPause, toggleFullscreen, toggleMute);

  const handleSeek = (event) => {
    const videoElement = videoRef.current;
    const seekable = videoElement.seekable;
  
    if (seekable && seekable.length > 0) {
      const value = parseFloat(event.target.value);
      const seekTime = (value / 100) * seekable.end(0);
  
      videoElement.currentTime = seekTime;
      setCurrentTime(seekTime);
    } else {
      console.error('Seeking is not currently allowed');
    }
  };

  const handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    setVolume(volume);
    videoRef.current.volume = volume;
    setIsMuted(volume === 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <div className="bg-slate-800 w-full">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mx-5 sm:mx-10 my-5 font-mono">Now Playing</h1>
      <div className="relative w-11/12 mx-auto sm:w-9/12 sm:mx-10 my-4">
        {!isPlaying && (
          <img
            className=" absolute w-full h-full rounded-xl"
            src={video.thumb}
            alt="thumbnail"
          />
        )}
        <video ref={videoRef}  className=" w-full rounded-xl"></video>
        <div className="absolute top-0 right-0 p-4 flex items-center">
          <button onClick={toggleMute} className="text-white sm:text-xl mr-2">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="vertical-slider sm:mx-2 h-1"
          />
        </div>
        <div
          className="w-full h-10 sm:h-[60px] absolute left-0 bottom-0 flex px-2 items-center justify-between rounded-xl mt-4 "
          style={{
            background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,1.5))",
          }}
        >
          <button
            className="text-white mx-1 sm:text-2xl sm:mx-4 "
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <input
            className="w-full h-1"
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
          />
          <div className="text-white text-[11px] font-semibold w-44 mx-1 sm:text-lg  sm:mx-4 text-center ">{`${formatTime(
            currentTime
          )} / ${formatTime(duration)}`}</div>
          <select
            className="rounded-md px-1 text-[11px] sm:text-lg sm:mx-4 text-center"
            value={playbackSpeed}
            onChange={handleSpeedChange}
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <button
            onClick={toggleFullscreen}
            className="text-white sm:text-xl mx-2 sm:mx-4"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
      <h1 className="text-center sm:text-left  text-2xl sm:mx-10 my-3 font-mono text-white font-semibold">{video.title} - {video.subtitle}</h1>
      <h3 className="text-center sm:text-left text-xl sm:mx-10 my-3 font-mono text-white font-semibold">Video Description</h3>
      <p className="text-center mx-3  sm:text-left sm:mx-10 my-3 font-mono text-gray-400 font-semibold">{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
