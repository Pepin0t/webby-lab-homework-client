import {
    GET_LIST_OF_FILMS,
    GET_LIST_OF_FILMS_LOADING,
    ADD_FILM,
    ADD_FILM_WAITING,
    DELETE_FILM,
    SORT_LIST_OF_FILMS,
    SEARCH_IN_LIST_OF_FILMS
} from "./types";

import { getListOfFilms as get, addFilm as add } from "../services/db";
import { txtParse } from "../utils/txtParser";

export const getListOfFilms = () => async dispatch => {
    dispatch(getListOfFilmsloading());

    try {
        const { data } = await get();

        dispatch({ type: GET_LIST_OF_FILMS, response: data });
    } catch (error) {
        dispatch({ type: GET_LIST_OF_FILMS, response: error.response.data });
    }
};

export const sortListOfFilms = () => {
    return { type: SORT_LIST_OF_FILMS };
};

export function addFilm(info, mode) {
    return async dispatch => {
        dispatch(addFilmWaiting());

        if (mode === "multiple") {
            try {
                const films = await txtParse(info);
                const { data } = await add(films);

                dispatch({ type: ADD_FILM, response: data });
            } catch (error) {
                dispatch({ type: ADD_FILM, response: error.response.data });
            }
        }

        if (mode === "single") {
            try {
                const { data } = await add(info);

                dispatch({ type: ADD_FILM, response: data });
            } catch (error) {
                dispatch({ type: ADD_FILM, response: error.response.data });
            }
        }
    };
}

export const deleteFilm = ID => {
    return { type: DELETE_FILM, ID };
};

export const searchInListOfFilms = (query, category) => {
    return { type: SEARCH_IN_LIST_OF_FILMS, query, category };
};

const getListOfFilmsloading = () => {
    return { type: GET_LIST_OF_FILMS_LOADING };
};

const addFilmWaiting = () => {
    return { type: ADD_FILM_WAITING };
};
