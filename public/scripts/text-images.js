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
fetch("data/quizzes.json").then(function (res) {
  return res.json();
}).then(function (data) {
  react(data);
});

function react(data) {
  var Quiz = /*#__PURE__*/function (_React$Component) {
    _inherits(Quiz, _React$Component);

    var _super = _createSuper(Quiz);

    function Quiz() {
      _classCallCheck(this, Quiz);

      return _super.apply(this, arguments);
    }

    _createClass(Quiz, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(Nav, {
          data: data
        });
      }
    }]);

    return Quiz;
  }(React.Component);

  var Nav = /*#__PURE__*/function (_React$Component2) {
    _inherits(Nav, _React$Component2);

    var _super2 = _createSuper(Nav);

    function Nav() {
      _classCallCheck(this, Nav);

      return _super2.apply(this, arguments);
    }

    _createClass(Nav, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("nav", null, this.props.data.map(function (data, i) {
          return /*#__PURE__*/React.createElement(Button, {
            key: i,
            text: data.title
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
      var _this;

      _classCallCheck(this, Button);

      _this = _super3.call(this, props);
      _this.displayQuiz = _this.displayQuiz.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Button, [{
      key: "displayQuiz",
      value: function displayQuiz(e) {
        console.log(e.target.textContent);
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
