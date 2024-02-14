import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Playlist from "./components/Playlist";
import videos from "./utils/videoData";

function App() {
  const [currentVideo, setCurrentVideo] = useState(videos[1]);
  //console.log(videos);

  return (
    <div className="sm:flex">
      <VideoPlayer video={currentVideo} />
      <Playlist videos={videos} setCurrentVideo={setCurrentVideo} />
    </div>
  );
}

export default App;
