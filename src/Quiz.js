import React, { Component } from "react";
import { QuizEnd } from "./QuizEnd";
import "./App.css";
import axios from "axios";

export class Quiz extends Component {
  QuizData = [];
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null, //current users answer
      currentIndex: 0, //current questions index
      options: [], //the four options
      quizEnd: false, //determines if it's the last question
      score: 0, //holds the score
      disabled: true, // determines the status of the buttons
    };
  }

  //Component that holds the current quiz
  loadQuiz = () => {
    console.log(this.QuizData);
    const { currentIndex } = this.state; //get the current question index
    this.setState(() => {
      return {
        question: this.QuizData[currentIndex].question,
        options: this.QuizData[currentIndex].options,
        answer: this.QuizData[currentIndex].answer,
      };
    });
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };
  componentDidMount() {
    if(this.QuizData.length === 0) {
    this.QuizData = axios.get('http://localhost:3000/api/questionRoutes/getQuestions')


    }
    setTimeout(2000)
    this.loadQuiz();
  }


  //Check the answer
  checkAnswer = (answer) => {
    console.log(answer);
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  componentDidUpdate(_prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: this.QuizData[currentIndex].question,
          options: this.QuizData[currentIndex].options,
          answer: this.QuizData[currentIndex].answer,
        };
      });
    }
  }

  finishHandler = () => {
    const { userAnswer, answer, score } = this.state;
    if (userAnswer === answer) {
      this.setState({
        score: score + 1, //adds 1 to end score
      });
    }

    if (this.state.currentIndex === this.QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };
  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;
    if (quizEnd) {
      return (
        <div>
          <h1>Game Over. Final score is {this.state.score} points</h1>
          <p>The correct Answers for the quiz are</p>
          <ul>
            {this.QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${this.QuizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        {currentIndex < this.QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentIndex === this.QuizData.length - 1 && (
          <button onClick={this.finishHandler} disabled={this.state.disabled}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
