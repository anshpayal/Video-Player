import { useState } from "react";

const useFullscreen = (videoRef) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
  
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Failed to enter fullscreen mode:", err);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };
  
    return { isFullscreen, toggleFullscreen };
  };

export default useFullscreen;  