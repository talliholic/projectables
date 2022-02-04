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

fetch("data/quizzes.json").then(function (res) {
  return res.json();
}).then(function (data) {
  react(data);
});

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
      _this.state = {
        //Stores the mapped data
        html: data[0].body
      };
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
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
          set: this.setHtml,
          data: data
        }), /*#__PURE__*/React.createElement(Container, {
          html: this.state.html
        }));
      }
    }]);

    return Quiz;
  }(React.Component);

  var Container = /*#__PURE__*/function (_React$Component2) {
    _inherits(Container, _React$Component2);

    var _super2 = _createSuper(Container);

    function Container(props) {
      _classCallCheck(this, Container);

      return _super2.call(this, props);
    }

    _createClass(Container, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, this.props.html.map(function (item, i) {
          return /*#__PURE__*/React.createElement(Item, {
            key: i.toString(),
            data: item
          });
        }));
      }
    }]);

    return Container;
  }(React.Component);

  var Item = /*#__PURE__*/function (_React$Component3) {
    _inherits(Item, _React$Component3);

    var _super3 = _createSuper(Item);

    function Item(props) {
      _classCallCheck(this, Item);

      return _super3.call(this, props);
    }

    _createClass(Item, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "item"
        }, /*#__PURE__*/React.createElement(Question, {
          text: this.props.data.q.caption,
          src: this.props.data.q.path
        }), /*#__PURE__*/React.createElement(Options, {
          options: this.props.data.options
        }));
      }
    }]);

    return Item;
  }(React.Component);

  var Question = /*#__PURE__*/function (_React$Component4) {
    _inherits(Question, _React$Component4);

    var _super4 = _createSuper(Question);

    function Question(props) {
      _classCallCheck(this, Question);

      return _super4.call(this, props);
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

  var Options = /*#__PURE__*/function (_React$Component5) {
    _inherits(Options, _React$Component5);

    var _super5 = _createSuper(Options);

    function Options(props) {
      _classCallCheck(this, Options);

      return _super5.call(this, props);
    }

    _createClass(Options, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "options"
        }, this.props.options.map(function (option, i) {
          return /*#__PURE__*/React.createElement(Option, {
            key: i.toString(),
            text: option.caption,
            src: option.path
          });
        }));
      }
    }]);

    return Options;
  }(React.Component);

  var Option = /*#__PURE__*/function (_React$Component6) {
    _inherits(Option, _React$Component6);

    var _super6 = _createSuper(Option);

    function Option(props) {
      _classCallCheck(this, Option);

      return _super6.call(this, props);
    }

    _createClass(Option, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("img", {
          className: "option",
          src: this.props.src
        });
      }
    }]);

    return Option;
  }(React.Component);

  var Nav = /*#__PURE__*/function (_React$Component7) {
    _inherits(Nav, _React$Component7);

    var _super7 = _createSuper(Nav);

    function Nav(props) {
      var _this2;

      _classCallCheck(this, Nav);

      _this2 = _super7.call(this, props);
      _this2.filterBody = _this2.filterBody.bind(_assertThisInitialized(_this2));
      return _this2;
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
        var _this3 = this;

        return /*#__PURE__*/React.createElement("nav", null, this.props.data.map(function (data, i) {
          return /*#__PURE__*/React.createElement(Button, {
            set: _this3.props.set,
            filter: _this3.filterBody,
            key: i,
            text: data.title
          });
        }));
      }
    }]);

    return Nav;
  }(React.Component);

  var Button = /*#__PURE__*/function (_React$Component8) {
    _inherits(Button, _React$Component8);

    var _super8 = _createSuper(Button);

    function Button(props) {
      var _this4;

      _classCallCheck(this, Button);

      _this4 = _super8.call(this, props);
      _this4.displayQuiz = _this4.displayQuiz.bind(_assertThisInitialized(_this4));
      return _this4;
    }

    _createClass(Button, [{
      key: "displayQuiz",
      value: function displayQuiz(e) {
        var data = this.props.filter(e.target.textContent);
        this.props.set(data[0].body);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("button", {
          onClick: this.displayQuiz
        }, this.props.text);
      }
    }]);

    return Button;
  }(React.Component);

  ReactDOM.render( /*#__PURE__*/React.createElement(Quiz, null), app);
}
