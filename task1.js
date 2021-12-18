const activateLogic = (RADIUS = 50, calculateDistance = false) => {
  const body = document.querySelector("body");

  const createVidoeList = async () => {
    const allImages = document.querySelectorAll("img");
    const imagesToReplace = [];

    allImages.forEach((minImageWidth) => {
      if (minImageWidth.width > 300) imagesToReplace.push(minImageWidth);
    });

    if (calculateDistance) {
      imagesToReplace.forEach((video) => {
        replaceImageWithVideo(video);
      });
    } else {
      imagesToReplace.forEach((video) => {
        video.onmouseover = () => {
          replaceImageWithVideo(video);
        };
      });
    }
  };

  const pauseOverlappingVideos = () => {
    const divsWithBorderRadius = document.querySelectorAll(".circle");
    const videos = document.querySelectorAll("video");
    for (let i = 0; i < divsWithBorderRadius.length - 1; i++) {
      const firstDiv = divsWithBorderRadius[i].getBoundingClientRect();
      const secondDiv = divsWithBorderRadius[i + 1].getBoundingClientRect();

      if (areDivsOverlapping(firstDiv, secondDiv)) {
        console.log(i, "overlap");
      } else {
        videos[i].play();
        console.log(i, "no overlap");
      }
    }
  };

  const areDivsOverlapping = (div1Location, div2Location) => {
    return (
      div1Location.left < div2Location.right &&
      div1Location.right > div2Location.left &&
      div1Location.top < div2Location.bottom &&
      div1Location.bottom > div2Location.top
    );
  };

  const replaceImageWithVideo = (image) => {
    const imageParent = image.parentElement;
    image.style.transition = "opacity 1s";
    image.style.position = "absolute";

    const video = createVideoElement(image.width, image.height);
    const source = document.createElement("source");
    source.src =
      "https://apv-static.minute.ly/videos/v-50bc6db9-a73b-49b1-966838-aa07-4f3bbace5851-s29.92-37.16m.mp4";

    video.appendChild(source);
    image.style.opacity = 0;
    imageParent.appendChild(video);

    setTimeout(() => {
      video.style.opacity = 1;
    }, 500);

    createBorderRadiusForVideo(video);
  };
  const createVideoElement = (width, height) => {
    const video = document.createElement("video");
    video.loop = true;
    video.muted = true;
    video.width = width;
    video.height = height;
    video.style.opacity = 0;
    video.style.transition = "opacity 1s";
    calculateDistance ? (video.autoplay = false) : (video.autoplay = true);

    return video;
  };

  const createBorderRadiusForVideo = (video) => {
    const length = document.querySelectorAll(".circle").length;
    const longestEdge = Math.max(video.width, video.height);
    const heightToWidthCompensation =
      video.width - video.height > 0
        ? video.width - video.height
        : video.height - video.width;
    const videoLocation = video.getBoundingClientRect();

    const div = document.createElement("div");

    div.style.cssText = `
    position: absolute;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    border-radius: 50%;
    background-color: rgba(128, 0, 0, 0.5);
    z-index: 10;
    left: ${videoLocation.left - RADIUS}px;
    top: ${
      videoLocation.top -
      RADIUS -
      heightToWidthCompensation / 2 +
      window.pageYOffset
    }px;
    width: ${parseInt(longestEdge) + RADIUS * 2}px;
    height: ${parseInt(longestEdge) + RADIUS * 2}px;
    `;
    div.classList.add("circle");
    div.id = length + 1;
    body.appendChild(div);
  };

  createVidoeList();

  setTimeout(() => {
    pauseOverlappingVideos();
  }, 1000);
};

activateLogic();
