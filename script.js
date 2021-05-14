var root = new Vue({
    el: "#root",
    data: {
        completeList: [],
        itemToSearch: "",
        itemsList: ["Film"],
        userInput: "",
        filmList: [],
    },

    methods: {
        research() {
            this.completeList = []
            this.filmList = []

            switch (this.itemToSearch) {

                case ("Film"):
                    this.movieSearch()
                    break;
            }
            this.userInput = ""
        },

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
                    });
                })
        },
    },
})