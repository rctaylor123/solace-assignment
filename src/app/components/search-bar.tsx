import React from 'react';

interface SearchBarProps {
    searchText: string;
    handleSearch: (search: string) => void;
    handleClearFilter: () => void;
}

export default function SearchBar({ searchText, handleSearch, handleClearFilter }: SearchBarProps) {
    return (
    <div className="max-w-sm space-y-3">
        <input
            type="text"
            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Filter Advocates"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    );
}