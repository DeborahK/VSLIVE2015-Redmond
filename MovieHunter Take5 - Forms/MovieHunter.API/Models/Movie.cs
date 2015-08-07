using System;
using System.Collections.Generic;

namespace MovieHunter.API.Models
{
    /// <summary>
    /// Defines a single movie
    /// </summary>
    public class Movie
    {
        public string Description { get; set; }
        public string Director { get; set; }
        public string ImdbLink { get; set; }
        public string Imageurl { get; set; }
        public int MovieId { get; set; }
        public string Mpaa { get; set; }
        public DateTime ReleaseDate { get; set; }
        public decimal? StarRating { get; set; }
        public string Title { get; set; }

    }
}