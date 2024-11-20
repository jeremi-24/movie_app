import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 my-6 mb-8">
     
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

     
      <span className="text-sm font-semibold text-gray-700">
        {currentPage} / {totalPages}
      </span>

      
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
