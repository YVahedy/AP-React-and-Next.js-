import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './BookSearch.module.css';
import Button from "@/components/ui/button";
import { getAllGenres } from '@/Data';

const BookSearch = (props) => {
  const g = useRef();
  const r = useRouter();

  const submit = (event) => {
    event.preventDefault();
    const selectedGenre = g.current.value;
    if (selectedGenre<1) return;
    r.push(`/genres/${selectedGenre}`);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label>Genre</label>
          <select id='genre' ref={g}>
            {props.genres && props.genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit">Filter Books</Button>
    </form>
  );
};

export default BookSearch;