const app = document.getElementById("app");

fetch("data/quizzes.json")
  .then((res) => res.json())
  .then((data) => {
    react(data);
  });

function react(data) {
  class Quiz extends React.Component {
    render() {
      return <Nav data={data} />;
    }
  }
  class Nav extends React.Component {
    render() {
      return (
        <nav>
          {this.props.data.map((data, i) => (
            <Button key={i} text={data.title} />
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
      console.log(e.target.textContent);
    }
    render() {
      return <button onClick={this.displayQuiz}>{this.props.text}</button>;
    }
  }

  ReactDOM.render(<Quiz />, app);
}
