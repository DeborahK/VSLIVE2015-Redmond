using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace MovieHunter.API.Models
{
    /// <summary>
    /// Manages the set of movies.
    /// </summary>
    public class MovieRepository
    {
        /// <summary>
        /// Creates a new product with default values
        /// </summary>
        /// <returns></returns>
        internal Movie Create()
        {
            Movie movie = new Movie
            {
                ReleaseDate = DateTime.Now
            };
            return movie;
        }
        
        /// <summary>
        /// Retrieves the list of movies from the repository.
        /// </summary>
        /// <returns></returns>
        internal List<Movie> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/movies.json");
            var json = System.IO.File.ReadAllText(filePath);
            var movies = JsonConvert.DeserializeObject<List<Movie>>(json);

            return movies;
        }

        /// <summary>
        /// Saves a single movie back to the repository.
        /// </summary>
        /// <param name="movie"></param>
        internal Movie Save(Movie movie)
        {
            // Read in the existing movies
            var movies = this.Retrieve();

            // Locate and replace the item
            var itemIndex = movies.FindIndex(p => p.MovieId == movie.MovieId);
            if (itemIndex > 0)
            {
                movies[itemIndex] = movie;
            }
            else
            {
                // Assign a new Id
                var maxId = movies.Max(m => m.MovieId);
                movie.MovieId = maxId + 1;
                movies.Add(movie);
            }

            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/movies.json");
            var json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return movie;
        }
    }
}