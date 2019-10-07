import React, { FC, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import * as MyTypes from "MyTypes";

import { connect } from "react-redux";

import Summary from "../../components/Summary";
import Button from "../../components/Button";

import "./style.sass";

interface Answers {
  questionIndex: number;
  answer: string;
  question: string;
}

interface ApiData {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface IResultProps extends RouteComponentProps<any> {
  answeredQuestions: Answers[];
  questions: ApiData[];
}

const Results: FC<IResultProps> = ({
  answeredQuestions,
  questions,
  history
}) => {
  // If a user tries to access the results page without having gone through the game flow, a redirect to Home is made.
  useEffect(() => {
    if (!questions.length) {
      history.push("/");
    }
  });
  // Goes through all questions, pulling out which ones were correct and storing them in a separate array
  const correctAnswers = questions.filter(
    (question, index) =>
      answeredQuestions[index].answer === question.correct_answer
  );
  return (
    <section className="Results">
      <div className="container">
        {questions.length && (
          <>
            <Summary correctAnswers={correctAnswers} questions={questions} />
            <Button
              color="blue"
              action="reset"
              text="Play Again"
              link="/play"
            />
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: MyTypes.ReducerState) => {
  return {
    questions: state.quiz.questions,
    answeredQuestions: state.quiz.answeredQuestions
  };
};

export default connect(mapStateToProps)(withRouter(Results));
