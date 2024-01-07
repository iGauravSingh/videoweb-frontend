import { useEffect, useReducer } from "react";
import { Movie } from "../types";
import axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie[] }
  | { type: ActionType.FAILED; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMoviesList = (offset: number) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  const fetchMoviesList = async () => {
    const sessionToken = cookie.get("session_token");
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(
        `http://localhost:8080/movies/list?offset=${offset}`,
        {
          headers: {
            ...(sessionToken
              ? { Authorization: `Bearer ${sessionToken}` }
              : null),
          },
        }
      );
      const moviesData = data ? [...data, ...response.data] : response.data;
      dispatch({ type: ActionType.SUCCESS, payload: moviesData });
    } catch (error: any) {
      //console.log(error);
      dispatch({
        type: ActionType.FAILED,
        payload: error?.response?.data?.errors[0].msg,
      });
    }
  };

  return { data, loading, error };
};

export default useMoviesList;

// Loading
// {type: LOAding}
// Error
// {type: Error, payload: string}
// Success
// {type: Success, payload: Movies[]}
