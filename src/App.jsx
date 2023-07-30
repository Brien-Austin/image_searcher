import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const apiKey = "qAUEqXxllI7FKKjQ5UpoR2w0C5VwwDQ2E02ELgSZa8U"
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      if (query) {
        const response = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              query: query,
              per_page: 100, // Adjust the number of results per search
            },
            headers: {
           Authorization:`Client-ID ${apiKey}`
            },
          }
        );

        setResults(response.data.results);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Image Search App</h1>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded"
          placeholder="Search for images"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {results.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || 'Unsplash Image'}
            className="w-full h-auto object-fit cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
