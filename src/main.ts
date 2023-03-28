import "./style.css";

/* URL definitions */
const API_KEY = "api_key=37ef32fca41fa61c67ea059959c2c2d5&";

const baseUrl = "https://api.themoviedb.org/3/";
const popularMovieEndpoint = "movie/popular?";
const popularShowEndpoint = "tv/popular?";
const trendingEndPoint = "trending/movie/day?";

let category = "";
let sortBy = 1;
const queryParams = new URLSearchParams({
  language: "en-US",
  page: "1"
});
const baseImageUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500";

let endpoint = popularMovieEndpoint;

/* Getting HTML Elements */
const container: Element | null = document.querySelector(".display");
const movies = document.getElementById("movies");
const tvShows = document.getElementById("shows");
const selectArea = document.getElementById("db-parms");

/*Functions */
async function fetchMovie(url: URL, type: String) {
  try{
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if(container){
      container.innerHTML='';
    }
    results.forEach(result=> {
      const { poster_path, overview, vote_average} = result;
      const release_date = type === 'movie' ? result.release_date : result.first_air_date;
      const title = type === 'movie' ? result.original_title : result.original_name;

      container?.insertAdjacentHTML(
        "afterbegin",
        `<figure class="display-container">
            <div class="display-image-container">
                  <img
                    src="${baseImageUrl}${posterSize}${poster_path}"
                    alt=""
                    class="display-container__img"
                  />
                  <figcaption class="display-summary">
                  <p class="display-summary__text">
                  ${overview}
                  </p>
                  </figcaption>
                  </div>
                  <figcaption class="display-details">
                    <p class="display-details__rating">${vote_average}</p>
                    <p class="display-details__release-date">${release_date}</p>
                    <p class="display-details__title">${title}</p>
                  </figcaption>
                </figure>`
      );

    })
  }

    catch(error){
      console.error(error);
    }
}


fetchMovie(
  new URL(`${baseUrl}${endpoint}${API_KEY}${queryParams.toString()}`),
  "movie"
);

movies?.addEventListener("click", () => {
  category = "movie";
  fetchMovie(
    new URL(`${baseUrl}${endpoint}${API_KEY}${queryParams.toString()}`),
    category
  );
});

tvShows?.addEventListener("click", () => {
  category = "tv";
  fetchMovie(
    new URL(
      `${baseUrl}${endpoint}${API_KEY}${queryParams.toString()}`
    ),
    category
  );
});

selectArea?.addEventListener("click", (e) => {
  if ((e.target as HTMLInputElement)?.value == "1") {
    endpoint = `${category}/popular?`;
  } else {
    endpoint = `trending/${category}/day?`;
  }
});
