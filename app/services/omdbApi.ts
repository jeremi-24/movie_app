import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApiResponse, Movie } from '@/types'; 

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  endpoints: (builder) => ({
    
    getMovies: builder.query<MovieApiResponse, { search: string; page: number }>({
      query: ({ search, page }) => ({
        url: '',
        params: {
          s: search || 'film',
          page: page.toString(),
          apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
        },
      }),
    }),
    
    getMovieDetails: builder.query<Movie, string>({
      query: (imdbID) => ({
        url: '',
        params: {
          apikey:  process.env.NEXT_PUBLIC_OMDB_API_KEY, 
          i: imdbID,
          plot: 'full', 
        },
      }),
    }),
    
    getMoviesWithDetails: builder.query<{ movies: Movie[], totalResults: string }, { search: string; page: number }>({
      async queryFn({ search, page }, _queryApi, _extraOptions, fetchWithBQ) {
     
        const response = await fetchWithBQ({
          url: '',
          params: {
            s: search || 'fantasy',
            page: page.toString(),
            apikey:  process.env.NEXT_PUBLIC_OMDB_API_KEY, 
          },
        });

        console.log('Liste des films retournée :', response);
        if (response.error) {
          return { error: response.error };
        }

        const movieList = (response.data as MovieApiResponse).Search || [];
        const totalResults = (response.data as MovieApiResponse).totalResults || '0';

       
        const detailPromises = movieList.map((movie) =>
          fetchWithBQ({
            url: '',
            params: {
              apikey:  process.env.NEXT_PUBLIC_OMDB_API_KEY, 
              i: movie.imdbID,
              plot: 'full',
            },
          })
        );

        const detailsResponses = await Promise.all(detailPromises);
        console.log('Réponses des détails des films :', detailsResponses);
       
        const detailedMovies = detailsResponses
          .filter((res) => !res.error)
          .map((res) => res.data as Movie);

      
        return { data: { movies: detailedMovies, totalResults } };
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMoviesWithDetailsQuery,
} = moviesApi;
