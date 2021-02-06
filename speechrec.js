window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  console.log(e.results);
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
  if (transcript.includes("play")) {
    console.log("starting video...");
  }
  if (transcript.includes("pause")) {
    console.log("pausing video...");
  }
  if (transcript.includes("back")) {
    console.log("going back 15 seconds");
  }
  if (transcript.includes("forward")) {
    console.log("going forward 15 seconds");
  }
  console.log(transcript);
});

recognition.addEventListener("end", recognition.start);

recognition.start();
