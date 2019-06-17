import {
    GET_LIST_OF_FILMS,
    GET_LIST_OF_FILMS_LOADING,
    ADD_FILM,
    ADD_FILM_WAITING,
    DELETE_FILM,
    SORT_LIST_OF_FILMS,
    SEARCH_IN_LIST_OF_FILMS
} from "../actions/types";

const initialState = {
    list: [],

    getListOfFilmsLoading: false,
    getListOfFilmsResponse: {},

    addFilmWaiting: false,
    addFilmResponse: {}
};

let actualList = initialState.list;

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_OF_FILMS: {
            if (action.response.ok) {
                actualList = action.response.data || [];

                return {
                    ...state,
                    list: actualList,
                    getListOfFilmsLoading: false,
                    getListOfFilmsResponse: action.response
                };
            }

            return {
                ...state,
                getListOfFilmsLoading: false,
                getListOfFilmsResponse: action.response
            };
        }
        case GET_LIST_OF_FILMS_LOADING: {
            return { ...state, getListOfFilmsLoading: true, getListOfFilmsResponse: {} };
        }

        case ADD_FILM: {
            if (action.response.ok) {
                const newfilms = action.response.data || [];

                actualList = [...actualList, ...newfilms];

                return {
                    ...state,
                    addFilmWaiting: false,
                    addFilmResponse: action.response,
                    list: actualList
                };
            }

            return {
                ...state,
                addFilmWaiting: false,
                addFilmResponse: action.response
            };
        }
        case ADD_FILM_WAITING: {
            return { ...state, addFilmWaiting: true, addFilmResponse: {} };
        }

        case DELETE_FILM: {
            actualList = actualList.filter(film => {
                return film.ID !== action.ID;
            });

            const currentList = state.list.filter(film => {
                return film.ID !== action.ID;
            });

            return {
                ...state,
                list: currentList
            };
        }

        case SORT_LIST_OF_FILMS: {
            const sortedList = state.list.slice().sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                }

                if (a.title < b.title) {
                    return -1;
                }

                return 0;
            });

            return { ...state, list: sortedList };
        }

        case SEARCH_IN_LIST_OF_FILMS: {
            const query = (action.query || "").toLowerCase();

            if (!query) {
                return { ...state, list: actualList };
            }

            const searchResult = actualList.filter(film => {
                const title = film.title.toLowerCase();

                const stars = film.stars
                    .slice()
                    .join()
                    .toLowerCase();

                return title.indexOf(query) !== -1 || stars.indexOf(query) !== -1;
            });

            return { ...state, list: searchResult };
        }

        default:
            return state;
    }
};
