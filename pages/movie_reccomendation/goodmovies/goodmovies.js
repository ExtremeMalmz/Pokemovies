//TMDB
///discover/movie?sort_by=popularity.desc 

const API_KEY = 'api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//movie keys


document.getElementById("1").innerHTML = localStorage.getItem("pokemonName");
document.getElementById("2").innerHTML = localStorage.getItem("winOrLose");
document.getElementById("3").innerHTML = "Pokemon type: " + localStorage.getItem("pokemonType");



//fantasy key is: 14
const FANTASYMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=14&sort_by=popularity.desc";
//horror key is: 36
const HORRORMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=36&sort_by=popularity.desc";
//action key is: 28
const ACTIONMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=28&sort_by=popularity.desc";
//animation key is: 16
const ANIMATIONMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=16&sort_by=popularity.desc";
//documentary key is: 99
const DOCUMENTARYMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=99&sort_by=popularity.desc";
//war key is: 10752
const WARMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=10752&sort_by=popularity.desc";
//drama key is: 18
const DRAMAMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=18&sort_by=popularity.desc";

const main = document.getElementById('main');
const tagsElem = document.getElementById('tags');


//call the function and pass the url

function therealmain() {
	movieCategoryAPIkey = determineAPIkey();
	getMovies(movieCategoryAPIkey);
}

function determineAPIkey() {
	var pokemonType = localStorage.getItem("pokemonType");
	console.log(pokemonType);

	if (localStorage.getItem("pokemonType") == "electric") {
		localStorage.setItem("genre", "Action");
		return ACTIONMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "normal") {
		localStorage.setItem("genre", "Animation");
		return ANIMATIONMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "grass") {
		localStorage.setItem("genre", "Fantasy");
		return FANTASYMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "fire") {
		localStorage.setItem("genre", "Horror");
		return HORRORMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "water") {
		localStorage.setItem("genre", "Documentary");
		return DOCUMENTARYMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "fighting") {
		localStorage.setItem("genre", "War");
		return WARMOVIEKEY;
	}
	else if (localStorage.getItem("pokemonType") == "poison") {
		localStorage.setItem("genre", "Drama");
		return DRAMAMOVIEKEY;
	}
	//just to make sure if the type doesnt match
	else {
		return DRAMAMOVIEKEY;
	}
}


//show the movies we get from data as respons, we fetch the url 
function getMovies(url) {
	console.log(url);
	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results);
		showMovies(data.results);
	})
}

function checkIfMovieIsFound() {
	console.log(document.getElementById("mainmovie").outerHTML);
}

function showMovies(data) {
	var count = 0;
	var foundMovie = false;
	var gameScore = localStorage.getItem("totalHealthLeft") / 10;

	main.innerHTML = '';
	data.forEach(movie => {

		const { title, poster_path, vote_average, genre_ids } = movie;
		const movieElem = document.createElement('div');
		movieElem.classList.add('movie');

		//find the genre
		//var movieGenre = getMovieGenreByID(genre_ids[0])
		movieElem.innerHTML =
			`
			<img src="${IMG_URL + poster_path}" alt="${title}">

			<div class="movie-info">
				<h5>${title}</h5>
				<span class="genre">${localStorage.getItem("genre")}</span>
				<span  class="${getcolor(vote_average)}">${vote_average} </span>
				
			</div>
	
			`

		//console.log(gameScore);
		//console.log(vote_average);

		//if the movie under or the same as gamescore its set as the winner movie
		if (vote_average <= gameScore) {
			//adds only one movie
			if (!foundMovie) {
				main.appendChild(movieElem);
				foundMovie = true;

			}
		}

		count++
		//console.log(count);


		//if no movies have been found that match the criteria this If statement makes sure something is added
		if (count == 20 && !foundMovie) {
			console.log("no movie found");
			main.appendChild(movieElem);
		}
	})
}


function getcolor(vote) {
	if (vote >= 8) {
		return 'green'
	} else if (vote >= 6) {
		return "orange"
	} else if (vote > 1 && vote < 6) {
		return 'red'
	}
}


therealmain();