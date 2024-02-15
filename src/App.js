import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import logo from "./VideoPlayerLogo.png";
import Playlist from "./components/Playlist";
import videos from "./utils/videoData";

function App() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  //console.log(videos);

  return (
    <div className="bg-slate-800">
      <div className="bg-slate-900">
        <img
          className=" w-[120px] mx-auto sm:w-[130px] sm:mx-8 py-2"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="sm:flex">
        <VideoPlayer video={currentVideo} />
        <Playlist videos={videos} setCurrentVideo={setCurrentVideo} />
      </div>
    </div>
  );
}

export default App;
