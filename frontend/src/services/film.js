const fetchFilm = async (movieId, mediaType) => {
    try {
        const data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)        
        return data.json()
    } catch (err) {
        const { res } = err
        if (res?.data) return res.data
        return { err: err.message || err }
    }
}

export {
    fetchFilm
}