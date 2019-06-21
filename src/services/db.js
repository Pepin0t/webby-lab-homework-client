import axios from "axios";

export const getListOfFilms = async () => {
    try {
        const res = await axios({
            method: "get",
            url: "/api/get-list-of-films",
            timeout: 5000
        });

        return Promise.resolve(res);
    } catch (error) {
        if (error.message === "timeout of 5000ms exceeded") {
            return Promise.reject({
                response: {
                    data: {
                        ok: false
                    }
                }
            });
        }

        return Promise.reject(error);
    }
};

export const addFilm = async data => {
    try {
        const res = await axios({
            method: "post",
            url: "/api/add-film",
            timeout: 5000,
            data: { data }
        });

        return Promise.resolve(res);
    } catch (error) {
        if (error.message === "timeout of 5000ms exceeded") {
            return Promise.reject({
                response: {
                    data: {
                        ok: false,
                        message: "Error. Try again!"
                    }
                }
            });
        }

        return Promise.reject(error);
    }
};

export const deleteFilm = async ID => {
    try {
        const res = await axios({
            method: "delete",
            url: "/api/delete-film",
            timeout: 5000,
            data: { ID }
        });

        return Promise.resolve(res);
    } catch (error) {
        if (error.message === "timeout of 5000ms exceeded") {
            return Promise.reject({
                response: {
                    data: {
                        ok: false
                    }
                }
            });
        }

        return Promise.reject(error);
    }
};
