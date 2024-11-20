"use client";

import React, { useState, useEffect } from "react";
import { useFilters } from "../context/FilterContext";
import { Input } from "@/components/ui/input";


const Header: React.FC = () => {
  const { genre, setGenre, year, setYear, searchQuery, setSearchQuery } = useFilters();  
  const [searchYear, setSearchYear] = useState<string>(year);
  const [searchGenre, setSearchGenre] = useState<string>(genre);
  


  useEffect(() => {
    if (searchGenre !== genre) {
      setGenre(searchGenre);  
    }
  }, [searchGenre, genre, setGenre]);

  
  useEffect(() => {
    if (searchYear !== year) {
      setYear(searchYear);    
    }
  }, [searchYear, year, setYear]);


  useEffect(() => {
    setSearchQuery(searchQuery); 
  }, [searchQuery, setSearchQuery]);


  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchGenre(e.target.value);
  };

 
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchYear(e.target.value);
  };

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="flex items-center justify-between max-h-[60px] p-4 bg-gray-100 shadow-md">

      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
        <span className="text-xl font-bold">FILMS</span>
      </div>

  
      <div className="flex items-center space-x-4">
        <select
          value={searchGenre}
          onChange={handleGenreChange}
          className="text-base p-2 border border-gray-300 rounded"
        >
          <option value="">TOUT GENRES</option>
          <option value="Action">ACTION</option>
          <option value="Adventure">ADVENTURE</option>
          <option value="Comedy">COMEDY</option>
          <option value="Drama">DRAMA</option>
          <option value="Fantasy">FANTASY</option>
          <option value="Horror">HORROR</option>
          <option value="Horror">ROMANCE</option>
          <option value="Mystery">MYSTERY</option>
          <option value="Sci-Fi">SCI-FI</option>
          <option value="Thriller">THRILLER</option>
        </select>
        <input
          type="text"
          placeholder="entrer l'année"
          value={searchYear}
          onChange={handleYearChange}
          className="text-lg p-2 border border-gray-300 rounded"
        />
      </div>

  
      <div className="w-1/3">
        <Input
          type="text"
          placeholder="Rechercher votre film..."
          value={searchQuery}  
          onChange={handleSearchChange} 
          className="w-full p-2 border-gray-300 rounded"
        />
      </div>
    </header>
  );
};

export default Header;
