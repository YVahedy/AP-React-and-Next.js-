import React, { useRef, useState } from 'react';
import styles from './BookSearch.module.css';
import Button from "@/components/ui/button";

const BookSearch = (props) => {
  const genreRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const selectedGenre = genreRef.current.value;
    props.onSearch(searchQuery, selectedGenre);
  };

  return (
    <form className={styles.form} onSubmit={handleSearchSubmit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="search">Search by Book Name</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="genre">Genre</label>
          <select id="genre" ref={genreRef}>
            <option value="">All Genres</option>
            {props.genres && props.genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default BookSearch;