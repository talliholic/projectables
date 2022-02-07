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

var app = document.getElementById("app");

var shuffleArray = function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

fetch("data/language.json").then(function (res) {
  return res.json();
}).then(function (data) {
  react(data);
  navigate();
});

function navigate() {
  var items = document.querySelectorAll(".item");
  items[0].classList.remove("hide");
  items[0].classList.add("display");
  var buttons = document.querySelectorAll(".nav-btn");
  buttons[0].setAttribute("disabled", "");
  var hidden = document.querySelectorAll(".display");
  var disabled = document.querySelectorAll('.nav-btn[disabled=""]');

  if (hidden.length === 2) {
    hidden[1].classList.add("hide");
    hidden[1].classList.remove("display");
  }

  if (disabled[1]) {
    disabled[1].removeAttribute("disabled");
  }
}

function react(data) {
  var numOptions = 4;
  data.map(function (quiz) {
    quiz.body = [];
    quiz.images.forEach(function (image, i) {
      quiz.body[i] = {
        q: image,
        op: quiz.images
      };
    });
    quiz.body.map(function (item) {
      var toRemove = item.op.length - numOptions;
      shuffleArray(item.op); //Stores the options to be used

      item.options = [];

      for (var i = 0; i < item.op.length; i++) {
        if (item.q !== item.op[i]) {
          //Stores the options that are not the question
          item.options.push(item.op[i]);
        }
      } //Pushes the item question as option


      item.options.push(item.q); //Shortens the options array to desired length

      item.options.splice(0, toRemove);
      shuffleArray(item.options);
    });
    shuffleArray(quiz.body);
  });

  var Quiz = /*#__PURE__*/function (_React$Component) {
    _inherits(Quiz, _React$Component);

    var _super = _createSuper(Quiz);

    function Quiz(props) {
      var _this;

      _classCallCheck(this, Quiz);

      _this = _super.call(this, props);
      _this.setHtml = _this.setHtml.bind(_assertThisInitialized(_this));
      _this.score = _this.score.bind(_assertThisInitialized(_this));
      _this.getScore = _this.getScore.bind(_assertThisInitialized(_this));
      _this.resetScore = _this.resetScore.bind(_assertThisInitialized(_this));
      _this.state = {
        html: data[0].body,
        score: {
          array: []
        }
      };

      for (var i = 0; i < _this.state.html.length; i++) {
        _this.state.score.array.push(0);
      }

      return _this;
    }

    _createClass(Quiz, [{
      key: "setHtml",
      value: function setHtml(quiz) {
        this.setState(function () {
          return {
            html: quiz
          };
        });
      }
    }, {
      key: "score",
      value: function score(input, itemIndex) {
        var _this2 = this;

        this.setState(function () {
          return _this2.state.score.array[itemIndex] = input;
        });
      }
    }, {
      key: "getScore",
      value: function getScore() {
        var sum = this.state.score.array.reduce(function (partialSum, a) {
          return partialSum + a;
        });

        if (sum !== 0) {
          sum = Math.round(sum / this.state.html.length * 100);
        }

        return sum;
      }
    }, {
      key: "resetScore",
      value: function resetScore() {
        var _this3 = this;

        this.setState(function () {
          var selected = document.querySelectorAll(".selected");
          selected.forEach(function (item) {
            item.classList.remove("selected");
          });
          var array = [];

          for (var i = 0; i < _this3.state.html.length; i++) {
            array.push(0);
          }

          return _this3.state.score.array = array;
        });
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
          reset: this.resetScore,
          set: this.setHtml,
          data: data
        }), /*#__PURE__*/React.createElement(Container, {
          setScore: this.score,
          score: this.getScore,
          html: this.state.html,
          reset: this.resetScore
        }));
      }
    }]);

    return Quiz;
  }(React.Component);

  var Nav = /*#__PURE__*/function (_React$Component2) {
    _inherits(Nav, _React$Component2);

    var _super2 = _createSuper(Nav);

    function Nav(props) {
      var _this4;

      _classCallCheck(this, Nav);

      _this4 = _super2.call(this, props);
      _this4.filterBody = _this4.filterBody.bind(_assertThisInitialized(_this4));
      return _this4;
    }

    _createClass(Nav, [{
      key: "filterBody",
      value: function filterBody(title) {
        var filteredData = this.props.data.filter(function (quiz) {
          return quiz.title === title;
        });
        return filteredData;
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        return /*#__PURE__*/React.createElement("nav", {
          className: "nav-quiz"
        }, this.props.data.map(function (data, i) {
          return /*#__PURE__*/React.createElement(Button, {
            set: _this5.props.set,
            filter: _this5.filterBody,
            key: i,
            text: data.title,
            reset: _this5.props.reset
          });
        }));
      }
    }]);

    return Nav;
  }(React.Component);

  var Button = /*#__PURE__*/function (_React$Component3) {
    _inherits(Button, _React$Component3);

    var _super3 = _createSuper(Button);

    function Button(props) {
      var _this6;

      _classCallCheck(this, Button);

      _this6 = _super3.call(this, props);
      _this6.displayQuiz = _this6.displayQuiz.bind(_assertThisInitialized(_this6));
      return _this6;
    }

    _createClass(Button, [{
      key: "displayQuiz",
      value: function displayQuiz(e) {
        navigate();
        var data = this.props.filter(e.target.textContent);
        this.props.set(data[0].body);
        this.props.reset();
        var hidden = e.target.parentNode.nextSibling.children[0].children[0];

        if (hidden.className === "visible") {
          hidden.className = "hidden";
        }

        var checkBtn = e.target.parentNode.nextSibling.children[0].children[1];

        if (checkBtn.hasAttribute("disabled")) {
          checkBtn.removeAttribute("disabled");
        }
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("button", {
          className: "btn-quiz",
          onClick: this.displayQuiz
        }, this.props.text);
      }
    }]);

    return Button;
  }(React.Component);

  var Container = /*#__PURE__*/function (_React$Component4) {
    _inherits(Container, _React$Component4);

    var _super4 = _createSuper(Container);

    function Container(props) {
      _classCallCheck(this, Container);

      return _super4.call(this, props);
    }

    _createClass(Container, [{
      key: "render",
      value: function render() {
        var _this7 = this;

        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement(Feedback, {
          score: this.props.score,
          reset: this.props.reset
        }), /*#__PURE__*/React.createElement(NavBtns, {
          body: this.props.html
        }), this.props.html.map(function (item, i) {
          return /*#__PURE__*/React.createElement(Item, {
            setScore: _this7.props.setScore,
            key: i.toString(),
            data: item,
            body: _this7.props.html
          });
        }));
      }
    }]);

    return Container;
  }(React.Component);

  var Feedback = /*#__PURE__*/function (_React$Component5) {
    _inherits(Feedback, _React$Component5);

    var _super5 = _createSuper(Feedback);

    function Feedback(props) {
      var _this8;

      _classCallCheck(this, Feedback);

      _this8 = _super5.call(this, props);
      _this8.check = _this8.check.bind(_assertThisInitialized(_this8));
      return _this8;
    }

    _createClass(Feedback, [{
      key: "check",
      value: function check(e) {
        e.target.previousSibling.className = "visible";
        e.target.setAttribute("disabled", "");
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "feedback"
        }, /*#__PURE__*/React.createElement("div", {
          className: "hidden",
          id: "msg",
          key: "score"
        }, "You scored ", /*#__PURE__*/React.createElement("span", {
          id: "score"
        }, this.props.score(), " pts.")), /*#__PURE__*/React.createElement("button", {
          className: "chk-work",
          onClick: this.check
        }, "Check my work"));
      }
    }]);

    return Feedback;
  }(React.Component);

  var NavBtns = /*#__PURE__*/function (_React$Component6) {
    _inherits(NavBtns, _React$Component6);

    var _super6 = _createSuper(NavBtns);

    function NavBtns(props) {
      _classCallCheck(this, NavBtns);

      return _super6.call(this, props);
    }

    _createClass(NavBtns, [{
      key: "render",
      value: function render() {
        var _this9 = this;

        return /*#__PURE__*/React.createElement("div", {
          className: "nav-items"
        }, this.props.body.map(function (item, i) {
          return /*#__PURE__*/React.createElement(NavBtn, {
            key: i.toString(),
            text: i + 1,
            body: _this9.props.body
          });
        }));
      }
    }]);

    return NavBtns;
  }(React.Component);

  var NavBtn = /*#__PURE__*/function (_React$Component7) {
    _inherits(NavBtn, _React$Component7);

    var _super7 = _createSuper(NavBtn);

    function NavBtn(props) {
      var _this10;

      _classCallCheck(this, NavBtn);

      _this10 = _super7.call(this, props);
      _this10.navigate = _this10.navigate.bind(_assertThisInitialized(_this10));
      return _this10;
    }

    _createClass(NavBtn, [{
      key: "navigate",
      value: function navigate(e) {
        var btnIndex = parseInt(e.target.textContent) + 1;
        var items = e.target.parentNode.parentNode.children;
        items[btnIndex].classList.remove("hide");
        items[btnIndex].classList.add("display");
        var buttons = e.target.parentNode.children;
        e.target.setAttribute("disabled", "");

        for (var i = 2; i < this.props.body.length + 2; i++) {
          if (i === btnIndex) {
            continue;
          }

          if (!items[i].classList.contains("hide")) {
            items[i].classList.add("hide");
            items[i].classList.remove("display");
          }
        }

        for (var _i = 0; _i < this.props.body.length; _i++) {
          if (_i === btnIndex - 2) {
            continue;
          }

          if (buttons[_i].hasAttribute("disabled")) {
            buttons[_i].removeAttribute("disabled");
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("button", {
          onClick: this.navigate,
          className: "nav-btn"
        }, this.props.text);
      }
    }]);

    return NavBtn;
  }(React.Component);

  var Item = /*#__PURE__*/function (_React$Component8) {
    _inherits(Item, _React$Component8);

    var _super8 = _createSuper(Item);

    function Item(props) {
      var _this11;

      _classCallCheck(this, Item);

      _this11 = _super8.call(this, props);
      _this11.index = _this11.index.bind(_assertThisInitialized(_this11));
      return _this11;
    }

    _createClass(Item, [{
      key: "index",
      value: function index(e) {
        var children = e.target.parentNode.parentNode.parentNode.children;
        var currIndex = Array.prototype.indexOf.call(children, e.target.parentNode.parentNode);
        return currIndex - 1;
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "item hide"
        }, /*#__PURE__*/React.createElement(Question, {
          text: this.props.data.q.caption,
          src: this.props.data.q.path
        }), /*#__PURE__*/React.createElement(Options, {
          itemIndex: this.index,
          setScore: this.props.setScore,
          options: this.props.data.options,
          answer: this.props.data.q.caption
        }));
      }
    }]);

    return Item;
  }(React.Component);

  var Question = /*#__PURE__*/function (_React$Component9) {
    _inherits(Question, _React$Component9);

    var _super9 = _createSuper(Question);

    function Question(props) {
      _classCallCheck(this, Question);

      return _super9.call(this, props);
    }

    _createClass(Question, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "question"
        }, this.props.text);
      }
    }]);

    return Question;
  }(React.Component);

  var Options = /*#__PURE__*/function (_React$Component10) {
    _inherits(Options, _React$Component10);

    var _super10 = _createSuper(Options);

    function Options(props) {
      _classCallCheck(this, Options);

      return _super10.call(this, props);
    }

    _createClass(Options, [{
      key: "render",
      value: function render() {
        var _this12 = this;

        return /*#__PURE__*/React.createElement("div", {
          className: "options"
        }, this.props.options.map(function (option, i) {
          return /*#__PURE__*/React.createElement(Option, {
            key: i.toString(),
            itemIndex: _this12.props.itemIndex,
            text: option.caption,
            src: option.path,
            setScore: _this12.props.setScore,
            answer: _this12.props.answer
          });
        }));
      }
    }]);

    return Options;
  }(React.Component);

  var Option = /*#__PURE__*/function (_React$Component11) {
    _inherits(Option, _React$Component11);

    var _super11 = _createSuper(Option);

    function Option(props) {
      var _this13;

      _classCallCheck(this, Option);

      _this13 = _super11.call(this, props);
      _this13.highlight = _this13.highlight.bind(_assertThisInitialized(_this13));
      _this13.state = {
        score: 0
      };
      return _this13;
    }

    _createClass(Option, [{
      key: "highlight",
      value: function highlight(e) {
        var children = e.target.parentNode.children;
        var currIndex = Array.prototype.indexOf.call(children, e.target);
        var feedback = e.target.parentNode.parentNode.parentNode.children[0].children[0];

        if (feedback.className === "visible") {
          feedback.className = "hidden";
        }

        e.target.classList.add("selected"); //Remove "Selected" from siblings

        for (var i = 0; i < children.length; i++) {
          if (currIndex === i) {
            continue;
          }

          if (children[i].classList.contains("selected")) {
            children[i].classList.remove("selected");
          }
        }

        for (var _i2 = 0; _i2 < children.length; _i2++) {
          if (children[_i2].classList.contains("selected") && this.props.text === this.props.answer) {
            this.state.score = 1;
            this.props.setScore(this.state.score, this.props.itemIndex(e));
          }

          if (children[_i2].classList.contains("selected") && this.props.text !== this.props.answer) {
            this.state.score = 0;
            this.props.setScore(this.state.score, this.props.itemIndex(e));
          }
        }

        var checkWork = e.target.parentNode.parentNode.parentNode.children[0].children[1];

        if (checkWork.hasAttribute("disabled")) {
          location.reload();
        }
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("img", {
          onClick: this.highlight,
          className: "option",
          src: this.props.src
        });
      }
    }]);

    return Option;
  }(React.Component);

  ReactDOM.render( /*#__PURE__*/React.createElement(Quiz, null), app);
}
