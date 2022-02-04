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
      sibling.nextElementSibling.classList.add("correct");
      if (sibling.nextElementSibling.classList.contains("incorrect")) {
        sibling.nextElementSibling.classList.remove("incorrect");
      }
    } else {
      sibling.nextElementSibling.textContent = "Incorrect!";
      sibling.nextElementSibling.classList.add("incorrect");
      if (sibling.nextElementSibling.classList.contains("correct")) {
        sibling.nextElementSibling.classList.remove("correct");
      }
    }
  };

  recognition.start();
}
const app = document.getElementById("app");

const session = document.getElementById("sessions");

const getData = (id) => {
  return new Promise((resolve, reject) => {
    fetch("data/sessions.json")
      .then((response) => response.json())
      .then((data) => resolve(data.filter((object) => object.id === id)))
      .catch((e) => reject(e));
  });
};

fetch("data/sessions.json")
  .then((response) => response.json())
  .then((data) => {
    //Don't count template object
    for (let i = 1; i < data.length; i++) {
      const elem = document.createElement("button");
      elem.className = "render";
      elem.id = data[i].id;
      elem.textContent = data[i].date + " " + data[i].subject;
      if (i === 1) {
        elem.setAttribute("disabled", "");
      }
      session.appendChild(elem);
    }
    getData(data[1].id)
      .then((data) => {
        toReact(data);
      })
      .catch((e) => console.log(e));
  })
  .catch((e) => console.log(e));

const sessions = document.querySelectorAll(".render");

session.addEventListener("click", (e) => {
  if (e.target.classList.contains("render")) {
    const children = e.target.parentNode.children;
    const currIndex = Array.prototype.indexOf.call(children, e.target);
    e.target.setAttribute("disabled", "");
    for (let i = 0; i < children.length; i++) {
      if (i === currIndex) {
        continue;
      }
      if (children[i].hasAttribute("disabled")) {
        children[i].removeAttribute("disabled");
      }
    }
    getData(e.target.id)
      .then((data) => {
        toReact(data);
      })
      .catch((e) => console.log(e));
  }
});

const toReact = (data) => {
  class Session extends React.Component {
    constructor(props) {
      super(props);
      this.speak = this.speech.bind(this);
      this.state = {
        data: data[0],
      };
    }
    speech(e) {
      speak(e.target.textContent);
    }
    render() {
      return (
        <div className="session">
          <Title
            click={this.speech}
            subject={this.state.data.subject}
            title={this.state.data.title}
          />
          <Instructions
            click={this.speech}
            instructions={this.state.data.instructions}
          />
        </div>
      );
    }
  }
  const Title = (props) => {
    return (
      <div>
        <h2 onClick={props.click} className="speak subject">
          {props.subject}
        </h2>
        <h2 onClick={props.click} className="speak">
          {props.title}
        </h2>
      </div>
    );
  };
  const Instructions = (props) => {
    return (
      <ul key="">
        {props.instructions.map((instruction, i) => (
          <Instruction
            key={i.toString()}
            text={instruction.c}
            embed={instruction.embed}
            img={instruction.img}
            link={instruction.link}
            click={props.click}
            words={instruction.words}
            listen={instruction.listen}
            noPic={instruction.text}
          />
        ))}
      </ul>
    );
  };
  const Instruction = (props) => {
    return (
      <div>
        <li onClick={props.click} className="speak">
          {props.text}
        </li>
        {props.embed && (
          <iframe
            width="560"
            height="315"
            src={props.embed}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {props.img && (
          <a target="_blank" href={props.img}>
            <img src={props.img} />
          </a>
        )}
        {props.link && (
          <a target="_blank" href={props.link}>
            <img src="media/click.png" />
          </a>
        )}
        {props.words && (
          <div className="words">
            {props.words.map((word, i) => (
              <Word
                key={i.toString()}
                click={props.click}
                cap={word.cap}
                src={word.src}
              />
            ))}
          </div>
        )}
        {props.listen &&
          props.listen.map((listen, i) => (
            <Listen key={i.toString()} cap={listen} />
          ))}
        {props.noPic &&
          props.noPic.map((text, i) => (
            <Text click={props.click} key={i.toString()} cap={text} />
          ))}
      </div>
    );
  };
  const Word = (props) => {
    return (
      <span onClick={props.click} className="speak">
        <img src={props.src} /> {props.cap}
      </span>
    );
  };
  class Listen extends React.Component {
    constructor(props) {
      super(props);
      this.speechToText = this.speechToText.bind(this);
    }
    speechToText(e) {
      listen(e.target);
    }
    render() {
      return (
        <div>
          <button onClick={this.speechToText} className="listen">
            {this.props.cap}
          </button>
          <span className="speak heard"></span>
          <span className="speak"></span>
        </div>
      );
    }
  }
  const Text = (props) => {
    return (
      <p onClick={props.click} className="speak">
        {props.cap}
      </p>
    );
  };
  ReactDOM.render(<Session />, app);
};
// const messages = document.getElementById("messages");

// messages.addEventListener("click", ()=>{
//    ReactDOM.render(<Session />, app);
// })
