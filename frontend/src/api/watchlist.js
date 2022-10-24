import client from "./client"


export const addWatchlist = async( mediaType, id, name ) => {
    const token = localStorage.getItem("auth-token");

    try {
        const { data } = await client.post(`/watchlist/add/${mediaType}/${id}`, name, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data

    } catch (err) {
        if (err.response?.data) return err.response.data;
        return { err: err.response.data.error || err.response.data };
    }
}


export const getWatchlistItem = async (mediaType, id) => {
    const token = localStorage.getItem("auth-token")

    try {
        const { data } = await client.get(`/watchlist/get/${mediaType}/${id}`, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data

    } catch (err) {
        if (err.response?.data) return err.response.data
        return { err: err.response.data.error || err.response.data }
    }
}


export const removeWatchlist = async (watchlistId) => {
    const token = localStorage.getItem("auth-token")

    try {
        const {data} = await client.delete(`/watchlist/delete/${watchlistId}`, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
        
    } catch (err) {
        if (err.response?.data) return err.response.data 
        return {err: err.response.data.error || err.response.data}
    }
}