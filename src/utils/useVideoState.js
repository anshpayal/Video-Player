import { useEffect, useState } from "react";

const useVideoState = (videoRef, video) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  useEffect(() => {
    if (video) {
      videoRef.current.src = video.sources;
      setIsPlaying(false);
    }
  }, [video, videoRef]);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  return {
    isPlaying,
    currentTime,
    setCurrentTime,
    duration,
    playbackSpeed,
    handlePlayPause,
    handleSpeedChange,
  };
};

export default useVideoState;
