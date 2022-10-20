import client from "./client";


export const addReview = async( mediaType, id, reviewData ) => {
    const token = localStorage.getItem("auth-token");

    try {
        const { data } = await client.post(`/review/add/${mediaType}/${id}`, reviewData, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data

    } catch (err) {
        const {res} = err
        if (res?.data) return res.data;
        return { err: err.message || err };
    }
}

export const getReview = async( mediaType, id ) => {
    const token = localStorage.getItem("auth-token");

    try {
        const { data } = await client.get(`/review/get/${mediaType}/${id}`, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data

    } catch (err) {
        const {res} = err
        if (res?.data) return res.data
        return {err: err.message || err}
    }
}