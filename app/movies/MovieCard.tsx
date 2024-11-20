import React from 'react';
import { Movie } from '@/types';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../redux/moviesSlice';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedMovie(movie));
  };

 
  const getStarRating = (rating: string) => {
    const score = parseFloat(rating.split('/')[0]);
    const stars = Math.round((score / 2));
    return stars;
  };

 
  const imdbRatingStars = movie.Ratings.find(rating => rating.Source === "Internet Movie Database");
  const imdbStars = imdbRatingStars ? getStarRating(imdbRatingStars.Value) : 0;

  return (
    <div 
      onClick={handleClick} 
      className="movie-card cursor-pointer p-2 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <img 
        src={movie.Poster} 
        alt={movie.Title} 
        className="w-full h-40 object-cover rounded-t-lg" 
      />
      <h3 className="text-sm font-semibold mt-2">{movie.Title}</h3>
      <p className="text-xs text-gray-500">{movie.Year}</p>
      
      
      <div className="flex space-x-1 mt-2">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={index < imdbStars ? "#D4A017" : "gray"}
            className="w-2.5 h-2.5"  
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
