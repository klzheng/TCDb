const API_KEY = "5b7ff1ca08f2367f1d77090c6730231d"
const BASE_URL = "https://api.themoviedb.org/3"

const PARAM = "&language=en-US&page=1"
const API_URL_TRENDING = BASE_URL + "/trending/all/week?api_key=" + API_KEY
const API_URL_TRENDING_MOV = BASE_URL + "/movie/popular?api_key=" + API_KEY + PARAM
const API_URL_TRENDING_SHOW = BASE_URL + "/tv/popular?api_key=" + API_KEY + PARAM
const API_URL_THEATERS = BASE_URL + "/movie/now_playing?api_key=" + API_KEY + PARAM
const IMG_URL = "https://image.tmdb.org/t/p/w500"
"/search/multi?api_key="
// const query = "&query=the+boys"

// Gets API data from url with a specific target in HTML
function getData(url, target) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            displayMovies(data.results, target)
        })
        .catch(err => console.log(err))
}

// Displays each film inside the data
function displayMovies(data, target) {
    data.forEach(movie => {
        const trendingCards = document.querySelector(target)
        const movieCol = document.createElement("div")
        let {name, title, overview, poster_path, vote_average} = movie
        name = checkFilmName(name, title)
        movieOverview = createCard(name, overview, poster_path, vote_average)
        movieName = createCardName(name)
        movieCol.appendChild(movieOverview)
        movieCol.appendChild(movieName)
        trendingCards.appendChild(movieCol)
    })
}

// Checks that the correct movie/show title is returned
function checkFilmName(name, title) {
    if (name === undefined) {
        name = title
    } 
    return name
}

// Creates card with hover information
function createCard(name, overview, poster_path, rating){
    const movieOverview = document.createElement("div")
    movieOverview.classList.add("card")
    movieOverview.innerHTML = 
        `
        <img src="${IMG_URL + poster_path}" alt="${name}">
        <div class="card-info">
            <p>${overview}</p>
        </div>
        <span class="card-rating">${rating.toFixed(1)}</span>
        `
    return movieOverview
}


// Creates card name tag
function createCardName(name) {
    const movieName = document.createElement("div")
    movieName.classList.add("card-name")
    movieName.innerHTML = 
        `
        <h3>${name}</h3>
        `
    return movieName
}

function changeTrending(el, classEl) {
    classEl.forEach(item => item.classList.remove("popular-slider-selected"))
    el.classList.toggle("popular-slider-selected")
    document.querySelector(".cards-trending").innerHTML = ""
    switch (el.id) {
        case "all": 
            getData(API_URL_TRENDING, ".cards-trending");
        case "movies": 
            getData(API_URL_TRENDING_MOV, ".cards-trending");
        case "shows":
            getData(API_URL_TRENDING_SHOW, ".cards-trending");
    }
}

const sliderOptions = document.querySelectorAll(".popular-slider-option")
sliderOptions.forEach(div => div.addEventListener("click", () => changeTrending(div, sliderOptions)))


getData(API_URL_TRENDING, ".cards-trending")
getData(API_URL_THEATERS, ".cards-theater")


