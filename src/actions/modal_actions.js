import { SHOW_NEW_FILM_MODAL, HIDE_NEW_FILM_MODAL } from "./types";

export const showNewFlimModal = () => {
    return { type: SHOW_NEW_FILM_MODAL };
};

export const hideNewFlimModal = () => {
    return { type: HIDE_NEW_FILM_MODAL };
};
