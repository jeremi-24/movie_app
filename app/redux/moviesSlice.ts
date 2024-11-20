import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieApiResponse, Movie } from '@/types'; 

interface MoviesState {
  movies: MovieApiResponse | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalResults: number; 
  selectedMovie: Movie | null; 
}

const initialState: MoviesState = {
  movies: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalResults: 0, 
  selectedMovie: null, 
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieApiResponse>) => {
      state.movies = action.payload;
     
      state.totalResults = action.payload.totalResults ? parseInt(action.payload.totalResults, 10) : 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload; 
    },
  },
});

export const { setMovies, setLoading, setError, setCurrentPage, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
