import React, { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Playlist = ({ videos, setCurrentVideo }) => {
  const originalPlayList = [...videos];

  const [playlist, setPlaylist] = useState(videos);
  const [searchText, setSearchText] = useState();

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

  const handleInputText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchBtnClick = () => {
    const searchedVideo = playlist.filter((video) => {
      return video.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setPlaylist(searchText ? searchedVideo : originalPlayList);
  };

  useEffect(() => {
    if (!searchText) {
      setPlaylist(originalPlayList);
    }
  }, [searchText]);

  return (
    <div className=" bg-slate-800 border-t-2 sm:border-l-2 border-slate-900 sm:w-4/12  p-2 overflow-y-auto ">
      <h1 className="text-xl sm:text-2xl text-white font-bold text-center mt-2 font-mono">
        Video Playlist
      </h1>
      <div className=" flex items-center justify-center p-2 my-3">
        <input
          className=" focus:outline-none border border-solid w-full border-gray-300 py-1 px-3 my-3 rounded-l-full"
          placeholder="Search from Playlist"
          value={searchText}
          onChange={handleInputText}
        ></input>
        <button
          className="bg-gray-300 py-2 px-3 text-lg rounded-r-full hover:bg-gray-200"
          onClick={handleSearchBtnClick}
        >
          <FaSearch />
        </button>
      </div>
      <div className="">
        {playlist.map((video, index) => (
          <div
            key={index}
            onClick={() => handleVideoClick(video)}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop(index)}
          >
            <div className="p-2 m-3 font-mono font-semibold bg-slate-500 rounded-lg flex items-center hover:bg-slate-300 truncate">
              {" "}
              <span className="mx-4">
                <FaVideo />
              </span>
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
