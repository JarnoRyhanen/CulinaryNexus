import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Recipe } from '../types';

const Search = ({ onSearchResults }: { onSearchResults: (data: Recipe[]) => void }) => {
    const [query, setQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const token = localStorage.getItem("token");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useDebounce(() => setDebouncedSearchQuery(query), 500, [query]);

    useEffect(() => {
        fetchData();
    }, [debouncedSearchQuery]);

    const fetchData = () => {

        const endpoint =
            debouncedSearchQuery.length === 0
                ? 'http://localhost:8080/recipes'
                : `http://localhost:8080/recipes/${debouncedSearchQuery}`; 

        fetch(endpoint, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                onSearchResults(data);
            })
    };

    return (
        <div className='relative h-[5rem] flex items-center justify-center'>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search recipes..."
                className="w-3/4 md:w-1/2 p-3 border bg-transparent border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
                className="absolute right-[12%] md:right-[26%] bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                onClick={() => {
                    console.log('Searching for:', query);
                    fetchData();
                }}
            >
                Search
            </button>
        </div>
    );
};

export default Search;