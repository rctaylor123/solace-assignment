import React from 'react';

interface SearchBarProps {
  searchText: string;
  handleSearch: (search: string) => void;
}

export default function SearchBar({ searchText, handleSearch }: SearchBarProps) {
  return (
    <div className='max-w-sm space-y-3'>
      <input
        type='text'
        className='block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm'
        placeholder='Filter Advocates'
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
