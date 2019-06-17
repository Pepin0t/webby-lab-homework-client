import { SHOW_NEW_FILM_MODAL, HIDE_NEW_FILM_MODAL } from "../actions/types";

const initialState = {
    show: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NEW_FILM_MODAL: {
            return { ...state, show: true };
        }

        case HIDE_NEW_FILM_MODAL: {
            return { ...state, show: false };
        }

        default:
            return state;
    }
};
