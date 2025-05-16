import React from 'react';

interface SearchBarProps {
    searchText: string;
    handleSearch: (search: string) => void;
    handleClearFilter: () => void;
}

function SearchBar({ searchText, handleSearch, handleClearFilter }: SearchBarProps) {
    return (
        <div>
            <p>Search</p>
            <p>
                Searching for: <span id="search-term">{searchText}</span>
            </p>
            <input value={searchText} style={{ border: "1px solid black" }} onChange={(e) => handleSearch(e.target.value)} />
            <button onClick={handleClearFilter}>Reset Search</button>
        </div>
    );
}

export default SearchBar;