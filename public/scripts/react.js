"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function speak(text) {
  var utter = new SpeechSynthesisUtterance();
  utter.lang = "en";
  utter.text = text;
  utter.volume = 1;
  utter.pitch = 1;
  utter.rate = 0.8; // event after text has been spoken
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
    var sibling = resultDom.nextElementSibling;
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

var app = document.getElementById("app");
var session = document.getElementById("sessions");

var getData = function getData(id) {
  return new Promise(function (resolve, reject) {
    fetch("data/sessions.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      return resolve(data.filter(function (object) {
        return object.id === id;
      }));
    })["catch"](function (e) {
      return reject(e);
    });
  });
};

fetch("data/sessions.json").then(function (response) {
  return response.json();
}).then(function (data) {
  //Don't count template object
  for (var i = 1; i < data.length; i++) {
    var elem = document.createElement("button");
    elem.className = "render";
    elem.id = data[i].id;
    elem.textContent = data[i].date + " " + data[i].subject;

    if (i === 1) {
      elem.setAttribute("disabled", "");
    }

    session.appendChild(elem);
  }

  getData(data[1].id).then(function (data) {
    toReact(data);
  })["catch"](function (e) {
    return console.log(e);
  });
})["catch"](function (e) {
  return console.log(e);
});
var sessions = document.querySelectorAll(".render");
session.addEventListener("click", function (e) {
  if (e.target.classList.contains("render")) {
    var children = e.target.parentNode.children;
    var currIndex = Array.prototype.indexOf.call(children, e.target);
    e.target.setAttribute("disabled", "");

    for (var i = 0; i < children.length; i++) {
      if (i === currIndex) {
        continue;
      }

      if (children[i].hasAttribute("disabled")) {
        children[i].removeAttribute("disabled");
      }
    }

    getData(e.target.id).then(function (data) {
      toReact(data);
    })["catch"](function (e) {
      return console.log(e);
    });
  }
});

var toReact = function toReact(data) {
  var Session = /*#__PURE__*/function (_React$Component) {
    _inherits(Session, _React$Component);

    var _super = _createSuper(Session);

    function Session(props) {
      var _this;

      _classCallCheck(this, Session);

      _this = _super.call(this, props);
      _this.speak = _this.speech.bind(_assertThisInitialized(_this));
      _this.state = {
        data: data[0]
      };
      return _this;
    }

    _createClass(Session, [{
      key: "speech",
      value: function speech(e) {
        speak(e.target.textContent);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "session"
        }, /*#__PURE__*/React.createElement(Title, {
          click: this.speech,
          subject: this.state.data.subject,
          title: this.state.data.title
        }), /*#__PURE__*/React.createElement(Instructions, {
          click: this.speech,
          instructions: this.state.data.instructions
        }));
      }
    }]);

    return Session;
  }(React.Component);

  var Title = function Title(props) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      onClick: props.click,
      className: "speak subject"
    }, props.subject), /*#__PURE__*/React.createElement("h2", {
      onClick: props.click,
      className: "speak"
    }, props.title));
  };

  var Instructions = function Instructions(props) {
    return /*#__PURE__*/React.createElement("ul", {
      key: ""
    }, props.instructions.map(function (instruction, i) {
      return /*#__PURE__*/React.createElement(Instruction, {
        key: i.toString(),
        text: instruction.c,
        embed: instruction.embed,
        img: instruction.img,
        link: instruction.link,
        click: props.click,
        words: instruction.words,
        listen: instruction.listen,
        noPic: instruction.text
      });
    }));
  };

  var Instruction = function Instruction(props) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("li", {
      onClick: props.click,
      className: "speak"
    }, props.text), props.embed && /*#__PURE__*/React.createElement("iframe", {
      width: "560",
      height: "315",
      src: props.embed,
      title: "YouTube video player",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true
    }), props.img && /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      href: props.img
    }, /*#__PURE__*/React.createElement("img", {
      src: props.img
    })), props.link && /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      href: props.link
    }, /*#__PURE__*/React.createElement("img", {
      src: "media/click.png"
    })), props.words && /*#__PURE__*/React.createElement("div", {
      className: "words"
    }, props.words.map(function (word, i) {
      return /*#__PURE__*/React.createElement(Word, {
        key: i.toString(),
        click: props.click,
        cap: word.cap,
        src: word.src
      });
    })), props.listen && props.listen.map(function (listen, i) {
      return /*#__PURE__*/React.createElement(Listen, {
        key: i.toString(),
        cap: listen
      });
    }), props.noPic && props.noPic.map(function (text, i) {
      return /*#__PURE__*/React.createElement(Text, {
        click: props.click,
        key: i.toString(),
        cap: text
      });
    }));
  };

  var Word = function Word(props) {
    return /*#__PURE__*/React.createElement("span", {
      onClick: props.click,
      className: "speak"
    }, /*#__PURE__*/React.createElement("img", {
      src: props.src
    }), " ", props.cap);
  };

  var Listen = /*#__PURE__*/function (_React$Component2) {
    _inherits(Listen, _React$Component2);

    var _super2 = _createSuper(Listen);

    function Listen(props) {
      var _this2;

      _classCallCheck(this, Listen);

      _this2 = _super2.call(this, props);
      _this2.speechToText = _this2.speechToText.bind(_assertThisInitialized(_this2));
      return _this2;
    }

    _createClass(Listen, [{
      key: "speechToText",
      value: function speechToText(e) {
        listen(e.target);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
          onClick: this.speechToText,
          className: "listen"
        }, this.props.cap), /*#__PURE__*/React.createElement("span", {
          className: "speak heard"
        }), /*#__PURE__*/React.createElement("span", {
          className: "speak"
        }));
      }
    }]);

    return Listen;
  }(React.Component);

  var Text = function Text(props) {
    return /*#__PURE__*/React.createElement("p", {
      onClick: props.click,
      className: "speak"
    }, props.cap);
  };

  ReactDOM.render( /*#__PURE__*/React.createElement(Session, null), app);
}; // const messages = document.getElementById("messages");
// messages.addEventListener("click", ()=>{
//    ReactDOM.render(<Session />, app);
// })
