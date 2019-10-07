import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import axios from "axios";

export enum actionTypes {
  ADD_ANSWER = "ADD_ANSWER",
  NEXT_QUESTION = "NEXT QUESTION",
  GET_QUESTIONS = "GET_QUESTIONS",
  RESET_GAME = "RESET_GAME"
}

export const quizActions = {
  addAnswer: (answer: {
    questionIndex: number;
    answer: string;
    question: string;
  }) => action(actionTypes.ADD_ANSWER, answer),
  nextQuestion: () => action(actionTypes.NEXT_QUESTION),
  storeQuestions: (payload: any) => action(actionTypes.GET_QUESTIONS, payload),
  resetGame: () => action(actionTypes.RESET_GAME)
};

export const fetchQuestions = () => {
  // Middleware is applied with Redux Thunk to run the request before completing the dispatch.
  return async (dispatch: Dispatch) => {
    console.log("Fetching questions..");
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
    );
    dispatch({
      type: actionTypes.GET_QUESTIONS,
      payload: response.data.results
    });
  };
};
