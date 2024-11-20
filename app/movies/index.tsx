'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import Header from './Header';
import { useFilters } from '../context/FilterContext';
import { setError, setMovies, setCurrentPage } from '../redux/moviesSlice';
import { RootState } from '../redux/store'; 
import { MovieApiResponse } from '@/types'; 
import { useGetMoviesWithDetailsQuery } from '../services/omdbApi';
import MovieCardDetails from './MovieCardetails';

const MoviesList: React.FC = () => {
  const { searchQuery, genre, year } = useFilters(); 
  const dispatch = useDispatch();
  const { movies, totalResults, currentPage, loading, error } = useSelector(
    (state: RootState) => state.movies
  );


  const { data, isError } = useGetMoviesWithDetailsQuery({
    search: searchQuery,
    page: currentPage,
  });
  useEffect(() => {
    if (data) {
      console.log('Total Results:', data.totalResults); 
    }
  }, [data]);
  

  useEffect(() => {
    if (isError) {
      dispatch(setError('Error loading movies'));
    } else if (data && data.movies && data.movies.length > 0) {
      const movieApiResponse: MovieApiResponse = {
        Search: data.movies, 
        totalResults: String(data.totalResults),
        Response: 'True',
      };
      dispatch(setMovies(movieApiResponse)); 
    }
  }, [data, isError, dispatch]);

  
  const filteredMovies = movies?.Search.filter((movie) => {
    const matchesYear = year ? movie.Year === year : true;
    const matchesGenre = genre ? movie.Genre?.toLowerCase().includes(genre.toLowerCase()) : true;
    return matchesYear && matchesGenre;
  });

 
  if (loading) {
    return <p>Chargement....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

 
  const totalPages = Math.ceil(Number(totalResults) / 10); 

  return (
    <div>
      <Header />
      <div className="flex p-4">
        
        <div className="w-4/6 pr-4 sticky top-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>Aucun film ou en cours de Chargement....</p>
            )}
          </div>
        </div>

     
        <div className="w-2/6 pl-4 sticky top-0">
         
          <MovieCardDetails />
        </div>
      </div>

     
      <div className="fixed bottom-0 left-0 max-h-[65px]   right-0 bg-white shadow-md ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setCurrentPage(page))} 
        />
      </div>
    </div>
  );
};

export default MoviesList;
