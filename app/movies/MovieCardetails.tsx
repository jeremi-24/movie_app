import React from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

const MovieCardDetails: React.FC = () => {
 
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie);

  if (!selectedMovie) {
    return <p className="text-center text-xl">Aucun film sélectionné</p>;
  }

  const getStarRating = (rating: string) => {
    const score = parseFloat(rating.split('/')[0]); 
    const stars = Math.round((score / 2)); 
    return stars > 5 ? 5 : stars; 
  };
  


  const imdbRatingStars = selectedMovie.Ratings.find(rating => rating.Source === "Internet Movie Database");
  const imdbStars = imdbRatingStars ? getStarRating(imdbRatingStars.Value) : 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
     
      <div className="flex flex-col space-y-6 max-h-[70vh] overflow-y-auto">
        
    
        <div className="flex justify-center">
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="w-60 h-92 object-cover rounded-lg shadow-lg"  
            aria-label="movie-poster"
          />
        </div>

   
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{selectedMovie.Title}</h2>
          <p className="text-lg text-gray-600"><strong>{selectedMovie.Year}</strong> | <strong>{selectedMovie.Rated}</strong></p>
          <p className="text-md text-gray-500"><strong>Sorti le :</strong> {selectedMovie.Released}</p>
          <p className="text-md text-gray-500"><strong>Durée :</strong> {selectedMovie.Runtime}</p>
          <p className="text-md text-gray-500"><strong>Genre :</strong> {selectedMovie.Genre}</p>
          
          <p className="text-md text-gray-500"><strong>Scénariste :</strong> {selectedMovie.Writer}</p>
          <p className="text-md text-gray-500"><strong>Acteurs :</strong> {selectedMovie.Actors}</p>
          <p className="text-md text-gray-500"><strong>Langue :</strong> {selectedMovie.Language}</p>
          <p className="text-md text-gray-500"><strong>Pays :</strong> {selectedMovie.Country}</p>
          <p className="text-md text-gray-500"><strong>Récompenses :</strong> {selectedMovie.Awards}</p>
          
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-lg">IMDb Note:</span>
        
            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={index < imdbStars ? "#D4A017" : "gray"}
                  className="w-6 h-6"
                  role="img" 
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
          </div>

          <div className="text-lg text-gray-800 mt-4">
            <h3 className="font-semibold"><strong>Synopsis :</strong></h3>
            <p className="text-md">{selectedMovie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardDetails;
