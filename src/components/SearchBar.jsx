import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [img, setImg] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim(); 
    setImg(inputValue);
  };

  const handleSearch = async () => {
    try {
    
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query:term,
            },
            headers: {
              Authorization: 'qAUEqXxllI7FKKjQ5UpoR2w0C5VwwDQ2E02ELgSZa8U',
            },
          }
        );

        setSearchResults(response.data.results);

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <input
        onChange={handleInputChange}
        className="mt-10 outline-slate-300 w-3/5 h-12 rounded-lg"
        placeholder="Search for an image"
        type="text"
      />
      {img.length < 3 ? (
        <button className="bg-purple-300 cursor-not-allowed px-5 py-3 mt-10 rounded-md">Search</button>
      ) : (
        <button onClick={handleSearch} className="bg-purple-500 px-5 py-3 mt-10 rounded-md">Search</button>
      )}
      {/* Display search results */}
      <div className="mt-4">
        {searchResults.map((result) => (
          <img
            key={result.id}
            src={result.urls.small}
            alt={result.alt_description}
            className="w-32 h-32 mx-2 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
