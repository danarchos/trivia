import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions/";

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

interface AppState {
  questions: [] | ApiData[];
  answeredQuestions: [] | Answers[];
  activeQuestion: number;
}

export const initialState: AppState = {
  questions: [],
  answeredQuestions: [],
  activeQuestion: 0
};

export const quizReducer = (
  state: AppState = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case actionTypes.ADD_ANSWER: {
      return {
        ...state,
        answeredQuestions: [...state.answeredQuestions, action.payload]
      };
    }
    case actionTypes.GET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload
      };
    }
    case actionTypes.NEXT_QUESTION: {
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1
      };
    }
    case actionTypes.RESET_GAME: {
      return {
        questions: [],
        answeredQuestions: [],
        activeQuestion: 0
      };
    }
    default:
      return state;
  }
};
