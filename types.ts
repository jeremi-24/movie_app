// app/services/omdbApi.ts
export interface OmdbApiResponse {
    Search: Movie[];
    totalResults: number;
    Response: string;
  }
  
  export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    BoxOffice: string;
    Website: string;
    Response: string;
  }
  
  export interface MovieApiResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }
  