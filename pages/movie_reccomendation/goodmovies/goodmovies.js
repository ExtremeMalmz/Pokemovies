//TMDB
///discover/movie?sort_by=popularity.desc 

document.getElementById("1").innerHTML = localStorage.getItem("pokemonName");
document.getElementById("2").innerHTML = localStorage.getItem("winOrLose");
document.getElementById("3").innerHTML = localStorage.getItem("pokemonType");
document.getElementById("4").innerHTML = localStorage.getItem("totalHealthLeft");


const API_KEY = 'api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//movie keys
//horror key is: 36
const HORRORMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=36";
//action key is: 28
const ACTIONMOVIEKEY = "https://api.themoviedb.org/3/discover/movie?api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7&with_genres=28&sort_by=popularity.desc";

const main = document.getElementById('main');
const tagsElem = document.getElementById('tags');


//call the function and pass the url
function therealmain(){
	movieCategoryAPIkey = determineAPIkey();
	getMovies(movieCategoryAPIkey);
}

function determineAPIkey(){
	var pokemonType = localStorage.getItem("pokemonType");
	console.log(pokemonType);

	if(localStorage.getItem("pokemonType") == "electric"){
		return ACTIONMOVIEKEY;
	}

	if(localStorage.getItem("pokemonType") == "normal"){
		return HORRORMOVIEKEY;
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

function getMovieGenreByID(genreNumID) {
	//searc the genre array, find id and return the name
	if (genreNumID == 16) {
		return "Super fun action";
	}
}

function checkIfMovieIsFound(){
	console.log(document.getElementById("mainmovie").outerHTML);
}

function showMovies(data) {
	var count = 0;
	var foundMovie = false;
	var gameScore = localStorage.getItem("totalHealthLeft")/10;

	

	

	

	main.innerHTML = '';
	data.forEach(movie => {

		const { title, poster_path, vote_average } = movie;
		const movieElem = document.createElement('div');
		movieElem.classList.add('movie');

		//find the genre
		//var movieGenre = getMovieGenreByID(genre_ids[0])
		movieElem.innerHTML =
			`
			<img src="${IMG_URL + poster_path}" alt="${title}">

			<div class="movie-info">
				<h3>${title}</h3>
				
				<span  class="${getcolor(vote_average)}">${vote_average} </span>
				
			</div>
	
			`

			//console.log(gameScore);
			//console.log(vote_average);
	
			//if the movie under or the same as gamescore its set as the winner movie
			if(vote_average <= gameScore){
				//adds only one movie
				if(!foundMovie){
					main.appendChild(movieElem);
					foundMovie = true;
					
				}
			}				
			
			count++
			//console.log(count);

			//if no movies have been found that match the criteria this If statement makes sure something is added
			if(count==20 && !foundMovie){
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

