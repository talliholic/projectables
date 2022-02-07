const app = document.getElementById("app");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

fetch("data/language.json")
  .then((res) => res.json())
  .then((data) => {
    react(data);
    navigate();
  });

function navigate() {
  const items = document.querySelectorAll(".item");
  items[0].classList.remove("hide");
  items[0].classList.add("display");
  const buttons = document.querySelectorAll(".nav-btn");
  buttons[0].setAttribute("disabled", "");
  const hidden = document.querySelectorAll(".display");
  const disabled = document.querySelectorAll('.nav-btn[disabled=""]');

  if (hidden.length === 2) {
    hidden[1].classList.add("hide");
    hidden[1].classList.remove("display");
  }
  if (disabled[1]) {
    disabled[1].removeAttribute("disabled");
  }
}

function react(data) {
  const numOptions = 4;
  data.map((quiz) => {
    quiz.body = [];
    quiz.images.forEach((image, i) => {
      quiz.body[i] = { q: image, op: quiz.images };
    });
    quiz.body.map((item) => {
      const toRemove = item.op.length - numOptions;
      shuffleArray(item.op);
      //Stores the options to be used
      item.options = [];
      for (let i = 0; i < item.op.length; i++) {
        if (item.q !== item.op[i]) {
          //Stores the options that are not the question
          item.options.push(item.op[i]);
        }
      }
      //Pushes the item question as option
      item.options.push(item.q);
      //Shortens the options array to desired length
      item.options.splice(0, toRemove);
      shuffleArray(item.options);
    });
    shuffleArray(quiz.body);
  });

  class Quiz extends React.Component {
    constructor(props) {
      super(props);
      this.setHtml = this.setHtml.bind(this);
      this.score = this.score.bind(this);
      this.getScore = this.getScore.bind(this);
      this.resetScore = this.resetScore.bind(this);
      this.state = {
        html: data[0].body,
        score: {
          array: [],
        },
      };
      for (let i = 0; i < this.state.html.length; i++) {
        this.state.score.array.push(0);
      }
    }
    setHtml(quiz) {
      this.setState(() => {
        return { html: quiz };
      });
    }
    score(input, itemIndex) {
      this.setState(() => {
        return (this.state.score.array[itemIndex] = input);
      });
    }
    getScore() {
      let sum = this.state.score.array.reduce(
        (partialSum, a) => partialSum + a
      );
      if (sum !== 0) {
        sum = Math.round((sum / this.state.html.length) * 100);
      }
      return sum;
    }
    resetScore() {
      this.setState(() => {
        const selected = document.querySelectorAll(".selected");
        selected.forEach((item) => {
          item.classList.remove("selected");
        });
        const array = [];
        for (let i = 0; i < this.state.html.length; i++) {
          array.push(0);
        }
        return (this.state.score.array = array);
      });
    }
    render() {
      return (
        <div>
          <Nav reset={this.resetScore} set={this.setHtml} data={data} />
          <Container
            setScore={this.score}
            score={this.getScore}
            html={this.state.html}
            reset={this.resetScore}
          />
        </div>
      );
    }
  }
  class Nav extends React.Component {
    constructor(props) {
      super(props);
      this.filterBody = this.filterBody.bind(this);
    }
    filterBody(title) {
      const filteredData = this.props.data.filter(
        (quiz) => quiz.title === title
      );
      return filteredData;
    }
    render() {
      return (
        <nav className="nav-quiz">
          {this.props.data.map((data, i) => (
            <Button
              set={this.props.set}
              filter={this.filterBody}
              key={i}
              text={data.title}
              reset={this.props.reset}
            />
          ))}
        </nav>
      );
    }
  }
  class Button extends React.Component {
    constructor(props) {
      super(props);
      this.displayQuiz = this.displayQuiz.bind(this);
    }
    displayQuiz(e) {
      navigate();
      const data = this.props.filter(e.target.textContent);
      this.props.set(data[0].body);
      this.props.reset();
      const hidden = e.target.parentNode.nextSibling.children[0].children[0];
      if (hidden.className === "visible") {
        hidden.className = "hidden";
      }
      const checkBtn = e.target.parentNode.nextSibling.children[0].children[1];
      if (checkBtn.hasAttribute("disabled")) {
        checkBtn.removeAttribute("disabled");
      }
    }
    render() {
      return (
        <button className="btn-quiz" onClick={this.displayQuiz}>
          {this.props.text}
        </button>
      );
    }
  }
  class Container extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="container">
          <Feedback score={this.props.score} reset={this.props.reset} />
          <NavBtns body={this.props.html} />
          {this.props.html.map((item, i) => (
            <Item
              setScore={this.props.setScore}
              key={i.toString()}
              data={item}
              body={this.props.html}
            />
          ))}
        </div>
      );
    }
  }
  class Feedback extends React.Component {
    constructor(props) {
      super(props);
      this.check = this.check.bind(this);
    }
    check(e) {
      e.target.previousSibling.className = "visible";
      e.target.setAttribute("disabled", "");
    }
    render() {
      return (
        <div className="feedback">
          <div className="hidden" id="msg" key="score">
            You scored <span id="score">{this.props.score()} pts.</span>
          </div>
          <button className="chk-work" onClick={this.check}>
            Check my work
          </button>
        </div>
      );
    }
  }
  class NavBtns extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="nav-items">
          {this.props.body.map((item, i) => (
            <NavBtn key={i.toString()} text={i + 1} body={this.props.body} />
          ))}
        </div>
      );
    }
  }
  class NavBtn extends React.Component {
    constructor(props) {
      super(props);
      this.navigate = this.navigate.bind(this);
    }
    navigate(e) {
      const btnIndex = parseInt(e.target.textContent) + 1;
      const items = e.target.parentNode.parentNode.children;
      items[btnIndex].classList.remove("hide");
      items[btnIndex].classList.add("display");
      const buttons = e.target.parentNode.children;
      e.target.setAttribute("disabled", "");
      for (let i = 2; i < this.props.body.length + 2; i++) {
        if (i === btnIndex) {
          continue;
        }
        if (!items[i].classList.contains("hide")) {
          items[i].classList.add("hide");
          items[i].classList.remove("display");
        }
      }
      for (let i = 0; i < this.props.body.length; i++) {
        if (i === btnIndex - 2) {
          continue;
        }
        if (buttons[i].hasAttribute("disabled")) {
          buttons[i].removeAttribute("disabled");
        }
      }
    }
    render() {
      return (
        <button onClick={this.navigate} className="nav-btn">
          {this.props.text}
        </button>
      );
    }
  }
  class Item extends React.Component {
    constructor(props) {
      super(props);
      this.index = this.index.bind(this);
    }

    index(e) {
      const children = e.target.parentNode.parentNode.parentNode.children;
      const currIndex = Array.prototype.indexOf.call(
        children,
        e.target.parentNode.parentNode
      );
      return currIndex - 1;
    }
    render() {
      return (
        <div className="item hide">
          <Question
            text={this.props.data.q.caption}
            src={this.props.data.q.path}
          />
          <Options
            itemIndex={this.index}
            setScore={this.props.setScore}
            options={this.props.data.options}
            answer={this.props.data.q.caption}
          />
        </div>
      );
    }
  }
  class Question extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div className="question">{this.props.text}</div>;
    }
  }
  class Options extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="options">
          {this.props.options.map((option, i) => (
            <Option
              key={i.toString()}
              itemIndex={this.props.itemIndex}
              text={option.caption}
              src={option.path}
              setScore={this.props.setScore}
              answer={this.props.answer}
            />
          ))}
        </div>
      );
    }
  }
  class Option extends React.Component {
    constructor(props) {
      super(props);
      this.highlight = this.highlight.bind(this);
      this.state = {
        score: 0,
      };
    }
    highlight(e) {
      const children = e.target.parentNode.children;
      const currIndex = Array.prototype.indexOf.call(children, e.target);
      const feedback =
        e.target.parentNode.parentNode.parentNode.children[0].children[0];
      if (feedback.className === "visible") {
        feedback.className = "hidden";
      }
      e.target.classList.add("selected");
      //Remove "Selected" from siblings
      for (let i = 0; i < children.length; i++) {
        if (currIndex === i) {
          continue;
        }
        if (children[i].classList.contains("selected")) {
          children[i].classList.remove("selected");
        }
      }
      for (let i = 0; i < children.length; i++) {
        if (
          children[i].classList.contains("selected") &&
          this.props.text === this.props.answer
        ) {
          this.state.score = 1;
          this.props.setScore(this.state.score, this.props.itemIndex(e));
        }
        if (
          children[i].classList.contains("selected") &&
          this.props.text !== this.props.answer
        ) {
          this.state.score = 0;
          this.props.setScore(this.state.score, this.props.itemIndex(e));
        }
      }
      const checkWork =
        e.target.parentNode.parentNode.parentNode.children[0].children[1];
      if (checkWork.hasAttribute("disabled")) {
        location.reload();
      }
    }
    render() {
      return (
        <img onClick={this.highlight} className="option" src={this.props.src} />
      );
    }
  }
  ReactDOM.render(<Quiz />, app);
}
