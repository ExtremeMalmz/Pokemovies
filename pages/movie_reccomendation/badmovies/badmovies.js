//TMDB
///discover/movie?sort_by=popularity.desc 

document.getElementById("1").innerHTML = localStorage.getItem("pokemonName");
document.getElementById("2").innerHTML = localStorage.getItem("winOrLose");
document.getElementById("3").innerHTML = localStorage.getItem("pokemonType");
document.getElementById("4").innerHTML = localStorage.getItem("totalHealthLeft");

const API_KEY = 'api_key=d9a60d2b9ae4db7ab0ca7aa0ca5a17e7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.asc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
	{
		"id": 14,
		"name": "Fantasy"

	},
	{
		"id": 27,
		"name": "Horror"


	},
	{
		"id": 28,
		"name": "Action"


	},

	{
		"id": 9648,
		"name": "Mystery"
	},

	{
		"id": 10752,
		"name": "War"
	},

	{
		"id": 35,
		"name": "Comedy"
	},
	{
		"id": 18,
		"name": "Drama"
	}
]

const main = document.getElementById('main');
const tagsElem = document.getElementById('tags')

//call the function and pass the url
getMovies(API_URL);
/*setGenres()

var selectedGenre = [] // array to save all the element from the selected genre
function setGenres() {
	tagsElem.innerHTML = '';
	//dynamic crate the tags
	genres.forEach(genre => {
		const t = document.createElement('div'); //genres
		t.classList.add('tag');
		t.id = genre.id;
		t.innerHTML = genre.name;

		//what happend if click on genre-bottun //clickable to change data
		t.addEventListener('click', () => {

			if (selectedGenre.length == 0) { //nothing inside = then push the genre.id to the end of array and return the new length of the array
				selectedGenre.push(genre.id);
			} else {
				if (selectedGenre.includes(genre.id)) { //if the genre.id is alreade inside = if true remove from array
					selectedGenre.forEach((id, idx) => { //idx is the position of element 
						if (id == genre.id) {
							selectedGenre.splice(idx, 1); //then remove one elm 
						}
					})
				} else {
					selectedGenre.push(genre.id);
				}
			}
			console.log(selectedGenre)
			getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
			// highlightSelection()
		})

		tagsElem.append(t); //se the genres 
	})
}



function highlightSelection() {
	const tags = document.querySelectorAll('.tag');
	tags.forEach(tag => {
		tag.classList.remove('highlight')
	})
	clearBtn()
	if(selectedGenre.length !=0){   
		selectedGenre.forEach(id => {
			const hightlightedTag = document.getElementById(id);
			hightlightedTag.classList.add('highlight');
		})
	}

}

function clearBtn(){
	let clearBtn = document.getElementById('clear');
	if(clearBtn){
		clearBtn.classList.add('highlight')
	}else{
		    
		let clear = document.createElement('div');
		clear.classList.add('tag','highlight');
		clear.id = 'clear';
		clear.innerText = 'Clear x';
		clear.addEventListener('click', () => {
			selectedGenre = [];
			setGenre();            
			getMovies(API_URL);
		})
		tagsEl.append(clear);
	}
    
}*/


//show the movies we get from data as respons, we fetch the url 
function getMovies(url) {

	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results);
		showMovies(data.results);
	})
}

function showMovies(data) {
	main.innerHTML = '';
	var newMovieAverage = 0;
	var currentMovieAverage = 0;

	data.forEach(movie => {

		const { title, poster_path, vote_average } = movie;
		const movieElem = document.createElement('div');
		movieElem.classList.add('movie');
		movieElem.innerHTML =
			`
			<img src="${IMG_URL + poster_path}" alt="${title}">

			<div class="movie-info">
				<h3>${title}</h3>
				<span  class="${getcolor(vote_average)}">${vote_average} </span>
				
			</div>
	
			`

		newMovieAverage = vote_average;

		if (newMovieAverage >= currentMovieAverage) {
			currentMovieAverage = newMovieAverage;

			main.appendChild(movieElem);
			main.replaceChildren(movieElem);


			console.log("AAAAAAA");
			console.log(vote_average);
			currentMovieAverage = parseInt(vote_average);
		}
		else {
			console.log("nope");

		}



	}

	)
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