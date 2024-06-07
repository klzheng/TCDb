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


export const fetchReviewData = async( id, mediaType ) => {
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


export const updateReview = async( reviewId , reviewData ) => {
    const token = localStorage.getItem("auth-token");

    try {
        const { data } = await client.patch(`/review/patch/${reviewId}`, reviewData, {
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


export const fetchAllReviews = async () => {
    const token = localStorage.getItem("auth-token");
    
    try {
        const {data} = await client.get(`/review/get/my-films/`, {
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


export const deleteReview = async (reviewId) => {
    const token = localStorage.getItem("auth-token")

    try {
        const { data } = await client.delete(`/review/delete/${reviewId}`, {
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


