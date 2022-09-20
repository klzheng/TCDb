const API_KEY = "5b7ff1ca08f2367f1d77090c6730231d"
const BASE_URL = "https://api.themoviedb.org/3"
const PARAM = "&language=en-US&page=1"
const API_URL_TRENDING = BASE_URL + "/trending/all/week?api_key=" + API_KEY
const API_URL_TRENDING_MOV = BASE_URL + "/movie/popular?api_key=" + API_KEY + PARAM
const API_URL_TRENDING_SHOW = BASE_URL + "/tv/popular?api_key=" + API_KEY + PARAM
const API_URL_THEATERS = BASE_URL + "/movie/now_playing?api_key=" + API_KEY + PARAM
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const API_SEARCH = "https://api.themoviedb.org/3/search/multi?&api_key=5b7ff1ca08f2367f1d77090c6730231d&language=en-US&page=1&query="
BASE_URL + "/search/multi?&api_key=" + API_KEY + PARAM + "&query="


// Gets API data from url with a specific target in HTML
function getData(url, target, cardStyle1, cardStyle2, cardStyle3, cardStyle4) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayMovies(data.results, target, cardStyle1, cardStyle2, cardStyle3, cardStyle4)
        })
        .catch(err => console.log(err))
}

// Displays each film inside the data
function displayMovies(data, target, cardStyle1, cardStyle2, cardStyle3, cardStyle4) {
    data.forEach(movie => {
        const targetLocation = document.querySelector(target)
        const movieCol = document.createElement("div")
        let {name, title, overview, poster_path, vote_average, release_date, first_air_date, profile_path, known_for_department} = movie
        name = checkFilmName(name, title)
        imagePath = checkImg(poster_path, profile_path)
        releaseDate = checkRelease(release_date, first_air_date, known_for_department)
        rating = checkRating(vote_average)
        overview = checkOverview(overview)
        movieOverview = createCard(name, overview, imagePath, rating, releaseDate, cardStyle1, cardStyle2, cardStyle3, cardStyle4)
        movieName = createCardName(name, cardStyle4)
        movieCol.appendChild(movieOverview)
        movieCol.appendChild(movieName)
        targetLocation.appendChild(movieCol)
    })
}

// Checks that the correct movie/show title is returned
function checkFilmName(name, title) {
    return name === undefined ? name = title : name
}

// Checks for correct release date (movie vs show)
function checkRelease(date1, date2, actor) {
    if (date1) {
        return date1
    } else if (date2) {
        return date2
    } else if (actor) {
        return actor
    }
    return ""
}


function checkOverview(overview) {
    return overview ? overview : ""
}


// Checks rating score
function checkRating(rating) {
    return rating === undefined ? "" : rating.toFixed(1)
}


// Creates card with hover information
function createCard(name, overview, image, rating, releaseDate, cardClass, cardInfo, cardRating, cardName){
    const movieOverview = document.createElement("div")
    movieOverview.classList.add(cardClass)
    movieOverview.innerHTML = 
        `
        <img src="${image}" alt="${name}">
        <div class="${cardInfo}">
            <h3 class="${cardName}">
                ${name}
            </h3>
            <p>${releaseDate}</p>
            <p>${overview}</p>
        </div>
        <span class="${cardRating}">${rating}</span>
        `
    return movieOverview
}


// Creates card name tag
function createCardName(name, cardName) {
    const movieName = document.createElement("div")
    movieName.classList.add(cardName)
    movieName.innerHTML = 
        `
        <h3>${name}</h3>
        `
    return movieName
}

// Manages popular options slider
function changeTrending(el, classEl) {
    classEl.forEach(item => item.classList.remove("popular-slider-selected"))
    el.classList.toggle("popular-slider-selected")
    document.querySelector(".cards-trending").innerHTML = ""
    switch (el.id) {
        case "all": 
            getData(API_URL_TRENDING, ".cards-trending", "card", "card-info", "card-rating", "card-name");
        case "movies": 
            getData(API_URL_TRENDING_MOV, ".cards-trending", "card", "card-info", "card-rating", "card-name");
        case "shows":
            getData(API_URL_TRENDING_SHOW, ".cards-trending", "card", "card-info", "card-rating", "card-name");
    }
}

// Checks image path for valid result, if not a default image path is returned
function checkImg(imgPath, profilePath) {
    if (imgPath) {
        return `${IMG_URL + imgPath}`
    } else if (profilePath) {
        return `${IMG_URL + profilePath}`
    } 
    return "./images/default.jpg"
}

// resets form after submit
function resetForm(e) {
    e.target.reset()
}

// Creates slider options
const sliderOptions = document.querySelectorAll(".popular-slider-option")
sliderOptions.forEach(div => div.addEventListener("click", () => changeTrending(div, sliderOptions)))

// Generates default results on homepage
getData(API_URL_TRENDING, ".cards-trending", "card", "card-info", "card-rating", "card-name")
getData(API_URL_THEATERS, ".cards-theater", "card", "card-info", "card-rating", "card-name")

// Search movies db for results
const form = document.querySelector("#main-search-form")
const search = document.querySelector("#main-search")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = search.value;
    if (query) {
        document.querySelector(".cards-search").innerHTML = ""
        getData(API_SEARCH + query, ".cards-search", "card-search", "card-search-info", "card-search-rating", "card-search-name");
        search.value = "";
    }
});

