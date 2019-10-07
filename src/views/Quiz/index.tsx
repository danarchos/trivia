import * as React from "react";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { fetchQuestions } from "../../actions/actions";
import { ScaleLoader } from "halogenium";
import he from "he";

import Question from "../../components/Question";

import "./style.sass";

interface ApiData {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface Answers {
  questionIndex: number;
  answer: string;
  question: string;
}

interface IQuizProps extends RouteComponentProps<any> {
  questions: ApiData[] | [];
  activeQuestion: number;
  answeredQuestions: Answers[];
  addAnswer: (answer: Answers) => object;
  nextQuestion: () => void;
  storeQuestions: () => void;
}

class Quiz extends React.Component<IQuizProps> {
  componentDidMount = () => {
    // On mounting, a Redux Action initiates, retrieving the questions with an axios request, which are stored in the global state.
    this.props.storeQuestions();
  };

  handleAnswer = (e: React.MouseEvent) => {
    // Adds the answer to the state and checks if the question answered was the last, if so, ends the game, otherwise moves to the next question
    const {
      addAnswer,
      activeQuestion,
      questions,
      history,
      nextQuestion
    } = this.props;
    addAnswer({
      questionIndex: activeQuestion,
      answer: e.currentTarget.id,
      question: questions[activeQuestion].question
    });
    if (activeQuestion === questions.length - 1) {
      history.push("/results");
    } else {
      nextQuestion();
    }
  };

  render() {
    const { activeQuestion, questions } = this.props;
    return (
      <section className="Quiz">
        <div className="container">
          {!questions.length ? (
            <div className="Quiz__loader-container">
              <ScaleLoader color="#262261" size="16px" margin="4px" />
            </div>
          ) : (
            <Question
              handleAnswer={this.handleAnswer}
              question={he.decode(questions[activeQuestion].question)}
              category={questions[activeQuestion].category}
              questionNumber={activeQuestion}
            />
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: MyTypes.ReducerState) => {
  return {
    questions: state.quiz.questions,
    answeredQuestions: state.quiz.answeredQuestions,
    activeQuestion: state.quiz.activeQuestion
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addAnswer: (answer: Answers) =>
      dispatch({ type: actionTypes.ADD_ANSWER, payload: answer }),
    nextQuestion: () => dispatch({ type: actionTypes.NEXT_QUESTION }),
    storeQuestions: () => dispatch(fetchQuestions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Quiz));
