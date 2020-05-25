import React, { Component } from "react";
import './App.css';
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      display: "Generate a quote by clicking the button below.",
      randomNumber: 0,
      author: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState({
      randomNumber: Math.floor(Math.random() * this.state.quotes.length),
      display: this.state.quotes[this.state.randomNumber].text,
      author: this.state.quotes[this.state.randomNumber].author
    });
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then((resp) => resp.json())
      .then((data) => this.setState({ quotes: data }));
    console.log(this.state.quotes);
  }

  render() {
    const source = this.state.author;
    let person;
    if (source === null) {
      person = "Anonymous";
    } else {
      person = this.state.author;
    }
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/double-quote-1-460525.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="icon"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">Quote Generator</Navbar.Brand>
        </Navbar>

        <Container>
          <Card bg="info" text="light" style={{ marginTop: "5vh", height: "50vh" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '40px' }}>Quotes</Card.Title>

              <Card text="dark" style={{ marginTop: "5vh", height: "30vh" }}>
                <Card.Body style={{ marginTop: "8vh" }}>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {' '}
                      {this.state.display}{' '}
                    </p>
                    <footer className="blockquote-footer">
                      {person}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>

            </Card.Body>
          </Card>

          <Button className="btn btn-lg btn-info" style={{ marginTop: "10vh" }} onClick={this.handleClick}>
            Generate Quote
        </Button>
        </Container>
      </div >
    );
  }
}

export default App;