
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextType {
  genre: string;
  year: string;
  searchQuery: string;
  setGenre: (genre: string) => void;
  setYear: (year: string) => void;
  setSearchQuery: (query: string) => void; 
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  return (
    <FiltersContext.Provider value={{ genre, year, searchQuery, setGenre, setYear, setSearchQuery }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters doit être utilisé dans un FiltersProvider');
  }
  return context;
};
