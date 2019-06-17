import axios from "axios";

export const getListOfFilms = () => {
    return axios.get("/api/get-list-of-films");
};

export const addFilm = data => {
    return axios.post("/api/add-film", { data });
};

export const deleteFilm = ID => {
    return axios.delete("/api/delete-film", { data: { ID } });
};
