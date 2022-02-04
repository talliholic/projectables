const app = document.getElementById("app");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

fetch("data/quizzes.json")
  .then((res) => res.json())
  .then((data) => {
    react(data);
  });

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
      this.state = {
        //Stores the mapped data
        html: data[0].body,
      };
    }
    setHtml(quiz) {
      this.setState(() => {
        return { html: quiz };
      });
    }
    render() {
      return (
        <div>
          <Nav set={this.setHtml} data={data} />
          <Container html={this.state.html} />
        </div>
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
          {this.props.html.map((item, i) => (
            <Item key={i.toString()} data={item} />
          ))}
        </div>
      );
    }
  }
  class Item extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="item">
          <Question
            text={this.props.data.q.caption}
            src={this.props.data.q.path}
          />
          <Options options={this.props.data.options} />
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
              text={option.caption}
              src={option.path}
            />
          ))}
        </div>
      );
    }
  }
  class Option extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <img className="option" src={this.props.src} />;
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
        <nav>
          {this.props.data.map((data, i) => (
            <Button
              set={this.props.set}
              filter={this.filterBody}
              key={i}
              text={data.title}
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
      const data = this.props.filter(e.target.textContent);
      this.props.set(data[0].body);
    }
    render() {
      return <button onClick={this.displayQuiz}>{this.props.text}</button>;
    }
  }

  ReactDOM.render(<Quiz />, app);
}
