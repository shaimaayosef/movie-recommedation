import React from 'react';

const Filters = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="filters">
      <label>Filter by Genre:</label>
      <select value={selectedGenre} onChange={onGenreChange}>
        <option value="">All</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
