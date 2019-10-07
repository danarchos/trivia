import React, { FC } from "react";
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

interface IResultProps {
  answeredQuestions: Answers[];
  questions: ApiData[];
}

const Results: FC<IResultProps> = ({ answeredQuestions, questions }) => {
  // Goes through all questions, pulling out which ones were correct and storing them in a separate array
  const correctAnswers = questions.filter(
    (question, index) =>
      answeredQuestions[index].answer === question.correct_answer
  );
  return (
    <section className="Results">
      <div className="container">
        <Summary correctAnswers={correctAnswers} questions={questions} />
        <Button color="blue" action="reset" text="Play Again" link="/play" />
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

export default connect(mapStateToProps)(Results);
