
function checkScroll() {
  var videos = document.getElementsByTagName("video");

  var fraction = 0.1;

  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];

    var x = video.offsetLeft,
      y = video.offsetTop,
      w = video.offsetWidth,
      h = video.offsetHeight,
      r = x + w, 
      visibleX,
      visibleY,
      visible;

    visibleX = Math.max(
      0,
      Math.min(
        w,
        window.pageXOffset + window.innerWidth - x,
        r - window.pageXOffset
      )
    );
    visibleY = Math.max(
      0,
      Math.min(
        h,
        window.pageYOffset + window.innerHeight - y,
        b - window.pageYOffset
      )
    );

    visible = (visibleX * visibleY) / (w * h);

    if (visible > fraction) {
      video.play();
    } else {
      video.pause();
    }
  }
}

window.addEventListener("scroll", checkScroll, false);
window.addEventListener("resize", checkScroll, false);


const video = document.querySelector("video");
let playState = null;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (!entry.isIntersecting) {
      video.pause();
      playState = false;
    } else {
      video.play();
      playState = true;
    }
  });
}, {});

observer.observe(video);

const onVisibilityChange = () => {
  if (document.hidden || !playState) {
    video.pause();
  } else {
    video.play();
  }
};

document.addEventListener("visibilitychange", onVisibilityChange);
