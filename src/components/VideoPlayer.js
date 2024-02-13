import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import video from "../video.mp4";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    const { duration } = video;
    const seekTime = (event.target.value / 100) * duration;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="relative w-9/12">
      <video
        ref={videoRef}
        className=" w-full rounded-xl"
        src={video}
        autoPlay
      ></video>
      <div
        className="w-full h-[60px] absolute left-0 bottom-0 flex px-2 items-center justify-between rounded-xl mt-4 "
        style={{
          background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,1.5))",
        }}
      >
        <button className="text-white text-2xl mx-4 " onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <input
          className="w-full"
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
        <div className="text-white font-semibold w-32 mx-4 ">{`${formatTime(
          currentTime
        )} / ${formatTime(duration)}`}</div>
        <select className="rounded-md px-1 mx-4 text-center" value={playbackSpeed} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
