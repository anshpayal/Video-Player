import VideoPlayer from "./components/VideoPlayer";
import React, { useState } from "react";
import Playlist from "./components/Playlist";
import video1 from "./video.mp4"
import video2 from  "./video2.mp4"

function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const videos = [
    { title: "Video 1", source: video1 },
    { title: "Video 2", source: video2 },
  ];

  return (
    <div className="bg-slate-800 h-[100vh] flex justify-between">
      <VideoPlayer video={currentVideo} />
      <Playlist videos={videos} setCurrentVideo={setCurrentVideo}/>
    </div>
  );
}

export default App;
