window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  if (e.results[0].isFinal) {
    if (transcript.includes("play")) {
      togglePlay();
      console.log("starting video...");
    } else if (transcript.includes("pause")) {
      togglePlay();
      console.log("pausing video...");
    } else if (transcript.includes("back")) {
      video.currentTime += -15;
      console.log("going back 15 seconds");
    } else if (transcript.includes("forward")) {
      video.currentTime += 15;
      console.log("going forward 15 seconds");
    }
  }
  // console.log(transcript);
});

recognition.addEventListener("end", recognition.start);

recognition.start();
