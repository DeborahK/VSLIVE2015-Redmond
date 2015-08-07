using MovieHunter.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;

namespace MovieHunter.API.Controllers
{
    /// <summary>
    /// API for Movies
    /// </summary>
    [EnableCorsAttribute("http://localhost:64492", "*", "*")]
    public class MoviesController : ApiController
    {
        /// <summary>
        /// Retrieves all movies from the repository
        /// </summary>
        /// <returns></returns>
        /// <example>GET api/movies</example>
        [EnableQuery]
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Get()
        {
            try
            {
                var movieRepository = new MovieRepository();
                return Ok(movieRepository.Retrieve().AsQueryable());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Retrieves a single from the repository
        /// </summary>
        /// <returns></returns>
        /// <example>GET api/movies/5</example>
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Movie movie;
                var moviesRepository = new Models.MovieRepository();

                if (id > 0)
                {
                    var movies = moviesRepository.Retrieve();
                    movie = movies.FirstOrDefault(t => t.MovieId == id);
                    if (movie == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    movie = moviesRepository.Create();
                }
                return Ok(movie);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Retrieves a single from the repository
        /// with the defined title
        /// </summary>
        /// <returns></returns>
        /// <example>GET api/movies/5</example>
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Get(string title)
        {
            try
            {
                Movie movie;
                var moviesRepository = new Models.MovieRepository();

                var movies = moviesRepository.Retrieve();
                movie = movies.FirstOrDefault(t => t.Title == title);
                if (movie == null)
                {
                    return NotFound();
                }
                return Ok(movie);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST api/movies
        /// <summary>
        /// Saves a move passed in as part of a POST request
        /// </summary>
        /// <param name="movie"></param>
        /// <returns></returns>
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Post([FromBody]Models.Movie movie)
        {
            try
            {
                if (movie == null)
                {
                    return BadRequest("Movie cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var movieRepository = new Models.MovieRepository();
                var newMovie = movieRepository.Save(movie);
                if (newMovie == null)
                {
                    return Conflict();
                }
                return Created<Movie>(Request.RequestUri + newMovie.MovieId.ToString(),
                        newMovie);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
