const speakable = document.querySelectorAll(".speak");
const microphone = document.querySelectorAll(".listen");
const sessionNav = document.querySelectorAll(".session-nav");

function speak(text) {
  const utter = new SpeechSynthesisUtterance();
  utter.lang = "en";
  utter.text = text;
  utter.volume = 1;
  utter.pitch = 1;
  utter.rate = 0.8;
  // event after text has been spoken
  //   utter.onend = function () {
  //     alert("Speech has finished");
  //   };

  // speak
  window.speechSynthesis.speak(utter);
}
speakable.forEach((node) =>
  node.addEventListener("click", (e) => {
    speak(e.target.textContent);
  })
);
function listen(resultDom) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.onstart = function () {
    console.log("We are listening. Try speaking into the microphone.");
  };
  recognition.onspeechend = function () {
    recognition.stop();
  };
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    const sibling = resultDom.nextElementSibling;
    sibling.textContent = transcript;
    if (sibling.textContent === resultDom.textContent) {
      sibling.nextElementSibling.textContent = "Correct!";
    } else {
      sibling.nextElementSibling.textContent = "Incorrect!";
    }
  };
  recognition.start();
}

microphone.forEach((node) => {
  node.addEventListener("click", () => {
    listen(node);
  });
});
sessionNav.forEach((div) => {
  div.addEventListener("click", (e) => {
    console.log(e.target.href);
  });
});
