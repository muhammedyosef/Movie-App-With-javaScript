const apiBaseURL = "http://api.themoviedb.org/3/";
const apiKey = "7032929059f594caea522a2fd8afbde9";
const imageBaseUrl = "https://image.tmdb.org/t/p/";
var search = "";
//Reset HTML strings to empty to overwrite with new one!
var showOnHTML = "";
var genreHTML = "";

function getAllMovies() {
	const allMoviesURL = apiBaseURL + "movie/now_playing?api_key=" + apiKey;
  fetch(allMoviesURL)
    .then((response) => response.json())
    .then((allMovies) => {
      for (let i = 0; i < allMovies.results.length; i++) {
        var movieID = allMovies.results[i].id;
        var thisMovieUrl =
          apiBaseURL + "movie/" + movieID + "/videos?api_key=" + apiKey;
        fetch(thisMovieUrl)
          .then((response) => response.json())
          .then((movieKey) => {
            var poster =
              imageBaseUrl + "w300" + allMovies.results[i].poster_path;

            var title = allMovies.results[i].original_title;

            var releaseDate = allMovies.results[i].release_date;

            var overview = allMovies.results[i].overview;

            var voteAverage = allMovies.results[i].vote_average;
            var youtubeKey =movieKey.results[0]!==undefined&& movieKey.results[0].key;
            var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;

            var showOnHTML = `<div class="col-sm-3 eachMovie">
					<button type="button" class="btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" data-whatever="@${i}">
					<img src="${poster}">
					</button>
					<div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
                    
					<div class="modal-content ">
                    <div class="container-fluid">
                    <div class="row">
                         
                    
					<div class="col-sm-6 moviePosterInModal">
					<img src="${poster}"></a>
					</div>
                    <br>
					<div class="col-sm-6 movieDetails">
					<div class="movieName">${title}</div><br>
					<div class="linkToTrailer"><a href="${youtubeLink}" target="_blank">\u25B6  Play trailer</a></div><br>
					<div class="release">Release Date: ${releaseDate}</div><br>
					<div class="overview">${overview}</div><br>
					<div class="rating">Rating: ${voteAverage}/10</div><br>
					</div>
					</div>
					</div>
					</div>
					</div>

                    </div>
                   </div>
					`;

            document
              .getElementById("movie-grid")
              .insertAdjacentHTML("beforeend", showOnHTML);


          })
		  .catch(err=>console.log(err));
      }
    }) 
	.catch(err=>console.log(err));
}
function getMoviesByGenre(genreID) {
  const getMoviesByGenreURL =
    apiBaseURL +
    "genre/" +
    genreID +
    "/movies?api_key=" +
    apiKey +
    "&language=en-US&include_adult=false&sort_by=created_at.asc";
  fetch(getMoviesByGenreURL)
    .then((response) => response.json())
    .then((genreData) => {
      for (let i = 0; i < genreData.results.length; i++) {
        var movie_id = genreData.results[i].id;
        var thisMovieUrl =
          apiBaseURL + "movie/" + movie_id + "/videos?api_key=" + apiKey;
        fetch(thisMovieUrl)
          .then((response) => response.json())
          .then((movieKey) => {
            var poster =
              imageBaseUrl + "w300" + genreData.results[i].poster_path;

            var title = genreData.results[i].original_title;

            var releaseDate = genreData.results[i].release_date;

            var overview = genreData.results[i].overview;

            var voteAverage = genreData.results[i].vote_average;
            var youtubeKey =movieKey.results[0]!==undefined&& movieKey.results[0].key;
            var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;

            var genreHTML = `<div class="col-sm-3 eachMovie">
			<button type="button" class="btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" data-whatever="@${i}">
			<img src="${poster}">
			</button>
			<div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
			<div class="modal-content col-sm-12">
            <div class="container-fluid">
                    <div class="row">
			<div class="col-sm-6 moviePosterInModal">
			<img src="${poster}"></a>
			</div><br>
			<div class="col-sm-6 movieDetails">
			<div class="movieName">${title}</div><br>
			<div class="linkToTrailer"><a href="${youtubeLink}" target="_blank"> \u25B6 Play trailer</a></div><br>
			<div class="release">Release Date: ${releaseDate}</div><br>
			<div class="overview">${overview}</div><br>
			<div class="rating">Rating: ${voteAverage}/10</div><br>
			</div>
			</div>
			</div>
			</div>
			</div>
            </div>
            </div>
			`;

            document
              .getElementById("movie-grid")
              .insertAdjacentHTML("beforeend", genreHTML);
          })
		  .catch(err=>console.log(err));
      }
    })
	.catch(err=>console.log(err));
}
function searchMovies() {
	const searchMovieURL =
	  apiBaseURL +
	  "search/movie?api_key=" +
	  apiKey +
	  "&language=en-US&page=1&include_adult=false&query=" +
	  search;
	fetch(searchMovieURL)
	  .then((respnse) => respnse.json())
	  .then((movieSearchResults) => {
		for (let i = 0; i < movieSearchResults.results.length; i++) {
		  var movie_id = movieSearchResults.results[i].id;
		  var thisMovieUrl =
			apiBaseURL + "movie/" + movie_id + "/videos?api_key=" + apiKey;
		  fetch(thisMovieUrl)
			.then((respnse) => respnse.json())
			.then((movieKey) => {
			  var poster =
				imageBaseUrl + "w300" + movieSearchResults.results[i].poster_path;
			  var title = movieSearchResults.results[i].original_title;
			  var releaseDate = movieSearchResults.results[i].release_date;
			  var overview = movieSearchResults.results[i].overview;
			  var voteAverage = movieSearchResults.results[i].vote_average;
			  var youtubeKey =movieKey.results[0]!==undefined&& movieKey.results[0].key;
			  var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
			  var searchResultsHTML = `<div class="col-sm-3 eachMovie">
					  <button type="button" class="btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" data-whatever="@${i}">
					  <img src="${poster}">
					  </button>
					  <div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					  <div class="modal-content col-sm-12">
                      <div class="container-fluid">
                    <div class="row">
					  <div class="col-sm-6 moviePosterInModal">
					  <img src="${poster}"></a>
					  </div><br>
					  <div class="col-sm-6 movieDetails">
					  <div class="movieName">${title}</div><br>
					  <div class="linkToTrailer"><a href="${youtubeLink}" target="_blank">\u25B6 Play trailer</a></div><br>
					  <div class="release">Release Date: ${releaseDate}</div><br>
					  <div class="overview">${overview}</div><br>
					  <div class="rating">Rating: ${voteAverage}/10</div><br>
					  </div>
					  </div>
					  </div>
					  </div>
					  </div>
					  </div>
					  </div>
					  `;
			  document
				.getElementById("movie-grid")
				.insertAdjacentHTML("beforeend", searchResultsHTML);
  
			  document.getElementById("movieGenreLabel").innerHTML = search;
			})
			.catch(err=>console.log(err));
		}
	  })
	  .catch(err=>console.log(err));
  }
//call getAllMovies() on default but GetMoviesByGenre and searchMovies using click functions
getAllMovies();

document
  .getElementsByClassName("searchForm")[0]
  .addEventListener("submit", function (event) {
    document.getElementById("movie-grid").innerHTML = " ";

    event.preventDefault();

    search = document.getElementsByClassName("form-control")[0].value;
    searchMovies();
  });
document
  .getElementsByClassName("navbar-brand")[0]
  .addEventListener("click", function () {
    getAllMovies();
    document.getElementById("movie-grid").innerHTML = showOnHTML;
    document.getElementById("movieGenreLabel").innerHTML = "My Movies";
  });
document
  .getElementsByClassName("allMovies")[0]
  .addEventListener("click", function () {
    getAllMovies();
    document.getElementById("movie-grid").innerHTML = showOnHTML;
    document.getElementById("movieGenreLabel").innerHTML = "All Movies";
  });
document.getElementById("action").addEventListener("click", function () {
  getMoviesByGenre(28);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Action";
});
document.getElementById("adventure").addEventListener("click", function () {
  getMoviesByGenre(12);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Adventure";
});
document.getElementById("animation").addEventListener("click", function () {
  getMoviesByGenre(16);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Animation";
});
document.getElementById("comedy").addEventListener("click", function () {
  getMoviesByGenre(35);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Comedy";
});
document.getElementById("crime").addEventListener("click", function () {
  getMoviesByGenre(80);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Crime";
});
document.getElementById("drama").addEventListener("click", function () {
  getMoviesByGenre(18);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Drama";
});
document.getElementById("family").addEventListener("click", function () {
  getMoviesByGenre(10751);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Family";
});
document.getElementById("fantasy").addEventListener("click", function () {
  getMoviesByGenre(14);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Fantasy";
});
document.getElementById("history").addEventListener("click", function () {
  getMoviesByGenre(36);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "History";
});
document.getElementById("horror").addEventListener("click", function () {
  getMoviesByGenre(27);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Horror";
});
document.getElementById("music").addEventListener("click", function () {
  getMoviesByGenre(10402);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Music";
});
document.getElementById("romance").addEventListener("click", function () {
  getMoviesByGenre(10749);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Romance";
});
document.getElementById("scifi").addEventListener("click", function () {
  getMoviesByGenre(878);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Science Fiction";
});
document.getElementById("thriller").addEventListener("click", function () {
  getMoviesByGenre(53);
  document.getElementById("movie-grid").innerHTML = genreHTML;
  document.getElementById("movieGenreLabel").innerHTML = "Thriller";
});



