import "./style.css";

const API_KEY = "api_key=37ef32fca41fa61c67ea059959c2c2d5&";

const baseUrl = "https://api.themoviedb.org/3/";
const popularEndpoint = "movie/popular?";
const trendingEndPoint = "trending/movie/day?";

const queryParams = new URLSearchParams();
queryParams.append("language", "en-US");
queryParams.append("page", "1");

const baseImageUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500";

const container = document.querySelector(".display-area");

console.log("hello");
fetchMovie(
  new URL(`${baseUrl}${popularEndpoint}${API_KEY}${queryParams.toString()}`),
  container
);

async function fetchMovie(url: URL, cont: any) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .then((results) => {
      results.forEach((movie: any) => {
        populateContainer(movie, cont);
      });
    })
    .catch((error) => console.error(error));
}

function populateContainer(moviedb: any, container: any) {
  const posterPath = moviedb.poster_path;
  container?.insertAdjacentHTML(
    "afterbegin",
    `<figure class="display-container">
        <div class="display-image-container">
              <img
                src="${baseImageUrl + posterSize + posterPath}"
                alt=""
                class="display-container__img"
              />
              <figcaption class="movie-summary">
              <p>
              ${moviedb.overview}
              </p>
              </figcaption>
              </div>
              <figcaption class="display-details">
                <p class="display-details__rating">${moviedb.vote_average}</p>
                <p class="display-details__release-date">${
                  moviedb.release_date
                }</p>
                <p class="display-details__title">${moviedb.original_title}</p>
              </figcaption>
            </figure>`
  );
}
