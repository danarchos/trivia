import React, { FC } from "react";
import he from "he";

import "./style.sass";

import tick from "../../images/tick-basic.svg";
import cross from "../../images/cross-basic.svg";

interface ISummaryProps {
  correctAnswers: ApiData[] | [];
  questions: ApiData[];
}

interface ApiData {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

const Summary: FC<ISummaryProps> = ({ correctAnswers, questions }) => {
  // Goes through all questions, and compares to the correctAnswers to see which to return, a Tick or a Cross.
  const wrongOrRight = (question: ApiData) => {
    const foundAnswer = correctAnswers.find(
      answers => answers.question === question.question
    );
    if (foundAnswer) {
      return <img src={tick} alt="G2i" />;
    } else {
      return <img src={cross} alt="G2i" />;
    }
  };
  return (
    <div className="Summary">
      <h1>You scored {correctAnswers.length}/ 10</h1>
      <h4>
        {correctAnswers.length < 5
          ? "Better luck next time"
          : correctAnswers.length < 8
          ? "Not bad, but you could do better.."
          : "Great score, well done!"}
      </h4>
      <div className="Summary__answers">
        {questions &&
          questions.map(question => (
            <div className="Summary__answers-item" key={question.question}>
              {wrongOrRight(question)}
              <p>{he.decode(question.question)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
