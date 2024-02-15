import { useEffect } from "react";

const useKeyboardShortcuts = (
  handlePlayPause,
  toggleFullscreen,
  toggleMute
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const searchBarFocused =
        document.activeElement.tagName.toLowerCase() === "input" &&
        document.activeElement.type === "text";
      if (!searchBarFocused) {
        switch (event.keyCode) {
          case 32:
            handlePlayPause();
            break;
          case 70:
            toggleFullscreen();
            break;
          case 77:
            toggleMute();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlayPause, toggleFullscreen, toggleMute]);
};

export default useKeyboardShortcuts;
