import React, { useState } from "react";
import { FaVideo } from "react-icons/fa6";

const Playlist = ({ videos, setCurrentVideo }) => {
  const [playlist, setPlaylist] = useState(videos);

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    const dragIndex = event.dataTransfer.getData("index");
    const newPlaylist = [...playlist];
    const [draggedItem] = newPlaylist.splice(dragIndex, 1);
    newPlaylist.splice(index, 0, draggedItem);
    setPlaylist(newPlaylist);
  };

  return (
    <div className="bg-slate-900 w-2/12 px-2 ">
      <h1 className="text-2xl text-white font-bold text-center mt-10 font-mono">
        Video Playlist
      </h1>
      {playlist.map((video, index) => (
        <div
          key={index}
          className="playlist-item"
          onClick={() => handleVideoClick(video)}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        >
          <div className="p-2 m-3 font-mono font-semibold bg-slate-500 rounded-lg flex items-center hover:bg-slate-300">
            {" "}
            <span className="mx-4">
              <FaVideo />
            </span>
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
