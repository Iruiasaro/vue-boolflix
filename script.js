var root = new Vue({
    el: "#root",
    data: {
        completeList: [],
        searchText: "",
        userInput: "",
        filmList: [],
        tvSeriesList: [],
        stelline: ['1', '2', '3', '4', '5'],
    },

    methods: {
        // FUNZIONE DI RICERCA 
        research() {
            this.completeList = []
            this.filmList = []
            this.tvSeriesList = []

            switch (this.searchText) {

                case ("Film"):
                    this.movieSearch()
                    break;

                case ("Tv-Series"):
                    this.tvSeriesSearch()
                    break;

                case (""):
                    this.movieSearch()
                    this.tvSeriesSearch()
                    break;
            }
            this.userInput = ""
        },
        // FILM
        movieSearch() {
            const query = {
                params: {
                    api_key: "7f8768df3edb2759e1b611780d7158c5",
                    language: "it-IT",
                    query: this.userInput,
                }
            }
            axios.get("https://api.themoviedb.org/3/search/movie", query)
                .then((resp) => {

                    const filmList = resp.data.results.map((movie) => {
                        movie.item = "Film"
                        return movie
                    })
                    filmList.forEach((index) => {
                        this.filmList.push(index);
                        this.completeList.push(index);
                    })
                })
        },
        // SERIE TV
        tvSeriesSearch() {
            const query = {
                params: {
                    api_key: "7f8768df3edb2759e1b611780d7158c5",
                    query: this.userInput,
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/search/tv", query)
                .then((resp) => {
                    const tvSeriesList = resp.data.results.map((tvSeries) => {
                        tvSeries.item = "seriesTv"
                        tvSeries.title = tvSeries.name
                        tvSeries.original_title = tvSeries.original_name
                        return tvSeries
                    })
                    tvSeriesList.forEach((index) => {
                        this.tvSeriesList.push(index);
                        this.completeList.push(index);
                    })
                })
        },
        // bandierine funzione 
        flagResult(movie) {
            const langCountry = {
                en: "us",
                ja: "jp",
                cs: "cz",
            };
            if (langCountry[movie.original_language]) {
                return langCountry[movie.original_language];
            } else {
                return movie.original_language;
            }
        },

        // funzione inserimento locandina 
        posterMovie(movie) {
            if (movie.poster_path) {
                return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
            } else {
                return "prova.jpg";
            }
        },

        // media voto
        mediaVoto(movie, element) {
            const voteAverage = Math.round(movie.vote_average / 2)
            if ((element + 1) <= voteAverage) {
                return true
            }
            return false
        },
    },
})