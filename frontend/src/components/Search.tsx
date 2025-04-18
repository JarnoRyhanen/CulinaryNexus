import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Recipe } from '../types';

const Search = ({ onSearchResults }: { onSearchResults: (data: Recipe[]) => void }) => {
    const [query, setQuery] = useState('');
    const [queryOption, setQueryOption] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropDownOptions] = useState(["Creator", "Recipe Type", "Recipe Name"]);

    const token = localStorage.getItem("token");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useDebounce(() => setDebouncedSearchQuery(query), 500, [query]);

    useEffect(() => {
        fetchData();
    }, [debouncedSearchQuery]);

    const fetchData = () => {

        const baseEndpoint = 'http://localhost:8080/recipes';
        let endPoint = baseEndpoint;

        switch (queryOption) {
            case "Creator":
                endPoint += `/creators/${debouncedSearchQuery}`;
                break;
            case "Recipe Type":
                endPoint += `/types/${debouncedSearchQuery}`;
                break;
            case "Recipe Name":
                endPoint += `/${debouncedSearchQuery}`;
                break;
        }

        console.log(endPoint);
        
        if(debouncedSearchQuery.length === 0) {
            endPoint = baseEndpoint;
        }

        fetch(endPoint, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onSearchResults(data);
            })
    };

    const handleOptionSelection = (option: string) => {
        console.log(option);
        setQueryOption(option);
        setShowDropdown(false);
    }

    return (
        <div className='relative h-[5rem] flex items-center justify-center'>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search recipes..."
                className="w-11/12 md:w-1/2 p-3 border bg-transparent border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
                className="absolute right-[27%] md:right-[34%] bg-transparent  px-4 py-2 rounded-lg border-2"
                onClick={() => {
                    setShowDropdown(!showDropdown)
                }}
            >
                Search By
            </button>

            <button
                className="absolute right-[7%] md:right-[26%] bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                onClick={() => {
                    console.log('Searching for:', query);
                    fetchData();
                }}
            >
                Search
            </button>

            {showDropdown && (
                <ul className="absolute top-[4.5rem] w-3/4 md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                    {dropDownOptions.map((option, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                            onClick={() => handleOptionSelection(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;