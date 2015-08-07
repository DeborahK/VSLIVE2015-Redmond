(function () {
    "use strict";

    var app = angular
                .module("movieResourceMock",
                        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var movies = [
            {
                description: "A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.",
                director: "Peter Jackson",
                imageurl: "http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Fellowship-Of-The-Ring_small.jpg",
                movieId: 1,
                mpaa: "pg-13",
                starRating: 4.8,
                releaseDate: "2001-12-19T00:00:00",
                title: "The Lord of the Rings: The Fellowship of the Ring"
            },
            {
                description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
                director: "Peter Jackson",
                imageurl: "http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Two-Towers_small.jpg",
                movieId: 2,
                mpaa: "pg-13",
                releaseDate: "2002-12-18T00:00:00",
                starRating: 4.5,
                title: "The Lord of the Rings: The Two Towers"
            },
            {
                description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                director: "Peter Jackson",
                imageurl: "http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Return-Of-The-King_small.jpg",
                movieId: 3,
                mpaa: "pg-13",
                releaseDate: "2003-12-17T00:00:00",
                starRating: 5,
                title: "The Lord of the Rings: The Return of the King"
            },
            {
                description: "An animated story of an unusual kingdom in which everything and everybody is pointed - except for a young boy named Oblio. Despite his round head, Oblio has many friends. But an evil count, jealous that Oblio is more popular than his own son, says that without a pointed head, Oblio is an outlaw. Along with his faithful dog Arrow, Oblio is exiled to the Pointless Forest. There, he has many fantastic experiences (including encounters with a 3-headed man, giant bees, a tree in the leaf-selling business, and a good-humored old rock). From his adventures, Oblio learns that it is not at all necessary to be pointed to have a point in life. Music composed and performed by Harry Nilsson ('Me and My Arrow'), who also wrote the story. ",
                director: "Fred Wolf",
                imdbLink: "http://www.imdb.com/title/tt0067595/?ref_=fn_al_tt_1",
                imageurl: null,
                movieId: 4,
                mpaa: "nr",
                releaseDate: "1971-02-02T00:00:00",
                starRating: 4.8,
                title: "The Point"
            }
        ];

        var moviesUrl = "http://localhost:1561/api/movies";

        $httpBackend.whenGET(moviesUrl).respond(movies);

        var editingRegex = new RegExp(moviesUrl + "/[0-9]+", "");
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var movie = { "movieId": 0 };
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < movies.length; i++) {
                    if (movies[i].movieId == id) {
                        movie = movies[i];
                        break;
                    }
                }
            }
            return [200, movie, {}];
        });

        $httpBackend.whenPOST(moviesUrl).respond(function (method, url, data) {
            var movie = angular.fromJson(data);

            if (!movie.movieId) {
                // new movie Id
                movie.movieId = movies[movies.length - 1].movieId + 1;
                movies.push(movie);
            }
            else {
                // Updated movie
                for (var i = 0; i < movies.length; i++) {
                    if (movies[i].movieId === movie.movieId) {
                        movies[i] = movie;
                        break;
                    }
                }
            }
            return [200, movie, {}];
        });

        // Catch all for testing purposes
        $httpBackend.whenGET(/api/).respond(function (method, url, data) {
            return [200, movies, {}];
        });

        // Pass through any requests for html files
        $httpBackend.whenGET(/\.html$/).passThrough();


    });
}());
