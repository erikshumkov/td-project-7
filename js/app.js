let i;
const video = document.querySelector("video");
const span = document.querySelectorAll("span");
const videoText = document.querySelector(".videoText");

// Media player settings, what features to show on player
$("video").mediaelementplayer({
  features: ["playpause", "fullscreen", "progress", "duration", "volume"],
  alwaysShowControls: true,
  startVolume: 0.7,
  videoVolume: "horizontal",
  stretching: "responsive"
});

// Event listens for the time update on the video, highlights text depending on the time
// of the clip.
video.ontimeupdate = function() {

  for(i = 0; i < span.length; i++) {

    // If current time is greater than data-start and lesser than data-end
    // show specific span text in orange.
    if (  video.currentTime > span[i].getAttribute("data-start")
          && video.currentTime < span[i].getAttribute("data-end") ) {
      span[i].style.backgroundColor = "#000";
      span[i].style.color = "#fff";
    }
    else {
      span[i].style.backgroundColor = "#fff";
      span[i].style.color = "#000";
    }
  }
};

//Got the idea from https://davidwalsh.name/event-delegate
// Click on span(text) tag to get to that particular time in the video.
videoText.addEventListener("click", (event) => {

// If span is clicked, video will jump to that sentence in video.
  if(event.target.tagName == "SPAN") {
    video.currentTime = event.target.getAttribute("data-start");
  }
});
