import React, { FC } from "react";

import "./style.sass";

import tick from "../../images/tick.svg";
import cross from "../../images/cross.svg";

interface IQuestionProps {
  questionNumber: number;
  category: string;
  question: string;
  handleAnswer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Question: FC<IQuestionProps> = ({
  category,
  question,
  handleAnswer,
  questionNumber
}) => (
  <div className="Question">
    <h4>{category}</h4>
    <span>Question {questionNumber} / 10</span>
    <h1>{question}</h1>
    <div className="Question__buttons">
      <button
        className="Question__buttons-true"
        id="True"
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAnswer(e)}
      >
        <img src={tick} alt="G2i" />
      </button>
      <button
        className="Question__buttons-false"
        id="False"
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAnswer(e)}
      >
        <img src={cross} alt="G2i" />
      </button>
    </div>
  </div>
);

export default Question;
