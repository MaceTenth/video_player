(videoEvents = () => {
  const video = document.querySelector("video");

  video.onplay = () => {
    console.log("%cPlay button clicked", "color:green");
  };

  video.onpause = () => {
    console.log("%cPause button clicked", "color:red");
  };

  video.onvolumechange = () => {
    console.log(
      `%cVolume change to ${(video.volume * 100).toFixed(2)}%`,
      "color:blue"
    );
  };

  video.onseeking = () => {
    console.log(`%cVideo skipped to ${video.currentTime}`, "color:orange");
  };

  video.ontimeupdate = () => {
    const percent = (video.currentTime / video.duration) * 100;

    console.log(`${percent.toFixed(2)}% of video played`);
    if (percent === 100) {
      console.log("Video completed");
    }
  };
})();
